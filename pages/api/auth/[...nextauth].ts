import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { supabase } from '@/lib/supabase/client';

// Helper function to verify password
async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
	try {
		return await bcrypt.compare(password, hashedPassword);
	} catch (error) {
		console.error('Password verification error:', error);
		return false;
	}
}

// Helper function to check if password is already hashed
function isHashed(password: string): boolean {
	// bcrypt hashes always start with $2a$, $2b$, or $2y$ followed by the cost parameter
	return /^\$2[aby]\$\d+\$/.test(password);
}

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email) {
					throw new Error('Email is required');
				}

				const adminEmail = process.env.ADMIN_EMAIL;
				const adminPassword = process.env.ADMIN_PASSWORD;

				if (!adminEmail || !adminPassword) {
					throw new Error('Admin credentials not configured');
				}

				// Check if the email matches the admin email from env
				if (credentials.email === adminEmail) {
					// Check if password is already hashed
					const passwordMatch = isHashed(adminPassword)
						? await verifyPassword(credentials.password, adminPassword)
						: credentials.password === adminPassword;

					if (passwordMatch) {
						return {
							id: '1',
							email: adminEmail,
							role: 'admin',
							name: 'Admin',
						};
					}
				}

				// Check database for admin users
				const { data: adminUser } = await supabase
					.from('admin_users')
					.select('*')
					.eq('email', credentials.email)
					.single();

				if (adminUser) {
					// Verify password hash from database
					const passwordMatch = isHashed(adminUser.password_hash || '')
						? await verifyPassword(credentials.password, adminUser.password_hash)
						: credentials.password === adminUser.password_hash;

					if (passwordMatch) {
						return {
							id: adminUser.id,
							email: adminUser.email,
							role: adminUser.role,
							name: adminUser.email.split('@')[0],
						};
					}
				}

				throw new Error('Invalid credentials');
			},
		}),
	],
	pages: {
		signIn: '/admin/login',
	},
	session: {
		strategy: 'jwt' as const,
		maxAge: 7 * 24 * 60 * 60, // 7 days
	},
	callbacks: {
		async jwt({ token, user }: any) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }: any) {
			if (session.user) {
				session.user.id = token.id;
				session.user.role = token.role;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
