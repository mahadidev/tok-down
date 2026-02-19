import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '@/lib/supabase/client';

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

				// Check if the email matches the admin email from env
				// For production, you'd want proper password verification in database
				const adminEmail = process.env.ADMIN_EMAIL;
				const adminPassword = process.env.ADMIN_PASSWORD;

				if (!adminEmail || !adminPassword) {
					throw new Error('Admin credentials not configured');
				}

				if (
					credentials.email === adminEmail &&
					credentials.password === adminPassword
				) {
					return {
						id: '1',
						email: adminEmail,
						role: 'admin',
						name: 'Admin',
					};
				}

				// Check database for admin users
				const { data: adminUser } = await supabase
					.from('admin_users')
					.select('*')
					.eq('email', credentials.email)
					.single();

				if (adminUser && credentials.password === adminPassword) {
					return {
						id: adminUser.id,
						email: adminUser.email,
						role: adminUser.role,
						name: adminUser.email.split('@')[0],
					};
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
		maxAge: 30 * 24 * 60 * 60, // 30 days
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
