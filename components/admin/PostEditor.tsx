'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';
import {
	FiBold,
	FiItalic,
	FiCode,
	FiList,
	FiType,
} from 'react-icons/fi';

interface PostEditorProps {
	content: string;
	onChange: (content: string) => void;
	placeholder?: string;
}

const PostEditor: React.FC<PostEditorProps> = ({
	content,
	onChange,
	placeholder = 'Start writing your post...',
}) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3],
				},
			}),
		],
		content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class:
					'prose prose-invert prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[400px] px-4 py-3',
			},
		},
		immediatelyRender: false,
	});

	useEffect(() => {
		if (editor && content !== editor.getHTML()) {
			editor.commands.setContent(content);
		}
	}, [content, editor]);

	if (!editor) {
		return null;
	}

	const MenuBar = () => (
		<div className="flex flex-wrap items-center gap-1 p-2 bg-black/50 border-b border-white/10 sticky top-0 z-10">
			{/* Headings */}
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={`flex items-center gap-1 px-2 py-1.5 rounded hover:bg-white/10 transition-colors ${
					editor.isActive('heading', { level: 1 })
						? 'bg-orange-500/20 text-orange-400'
						: 'text-gray-400'
				}`}
				title="Heading 1"
			>
				<FiType className="w-4 h-4" />
				<span className="text-xs font-bold">H1</span>
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={`flex items-center gap-1 px-2 py-1.5 rounded hover:bg-white/10 transition-colors ${
					editor.isActive('heading', { level: 2 })
						? 'bg-orange-500/20 text-orange-400'
						: 'text-gray-400'
				}`}
				title="Heading 2"
			>
				<FiType className="w-4 h-4" />
				<span className="text-xs font-bold">H2</span>
			</button>

			<div className="w-px h-6 bg-white/10 mx-1" />

			{/* Basic Formatting */}
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={`p-2 rounded hover:bg-white/10 transition-colors ${
					editor.isActive('bold')
						? 'bg-orange-500/20 text-orange-400'
						: 'text-gray-400'
				}`}
				title="Bold"
			>
				<FiBold className="w-4 h-4" />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={`p-2 rounded hover:bg-white/10 transition-colors ${
					editor.isActive('italic')
						? 'bg-orange-500/20 text-orange-400'
						: 'text-gray-400'
				}`}
				title="Italic"
			>
				<FiItalic className="w-4 h-4" />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				className={`px-2 py-1.5 rounded hover:bg-white/10 transition-colors line-through ${
					editor.isActive('strike')
						? 'bg-orange-500/20 text-orange-400'
						: 'text-gray-400'
				}`}
				title="Strikethrough"
			>
				S
			</button>
			<button
				onClick={() => editor.chain().focus().toggleCode().run()}
				className={`p-2 rounded hover:bg-white/10 transition-colors ${
					editor.isActive('code')
						? 'bg-orange-500/20 text-orange-400'
						: 'text-gray-400'
				}`}
				title="Code"
			>
				<FiCode className="w-4 h-4" />
			</button>

			<div className="w-px h-6 bg-white/10 mx-1" />

			{/* Lists */}
			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={`p-2 rounded hover:bg-white/10 transition-colors ${
					editor.isActive('bulletList')
						? 'bg-orange-500/20 text-orange-400'
						: 'text-gray-400'
				}`}
				title="Bullet List"
			>
				<FiList className="w-4 h-4" />
			</button>

			<div className="w-px h-6 bg-white/10 mx-1" />

			{/* Clear Formatting */}
			<button
				onClick={() => editor.chain().focus().unsetAllMarks().run()}
				className="p-2 rounded hover:bg-white/10 transition-colors text-gray-400"
				title="Clear Formatting"
			>
				Clear
			</button>
		</div>
	);

	return (
		<div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
			<MenuBar />
			<EditorContent editor={editor} />
			<style jsx global>{`
				.ProseMirror {
					min-height: 400px;
				}

				.ProseMirror p.is-editor-empty:first-child::before {
					color: #6b7280;
					content: attr(data-placeholder);
					float: left;
					height: 0;
					pointer-events: none;
				}

				.ProseMirror h1 {
					font-size: 1.875rem;
					font-weight: 700;
					margin-top: 1.5rem;
					margin-bottom: 1rem;
					line-height: 2.25rem;
				}

				.ProseMirror h2 {
					font-size: 1.5rem;
					font-weight: 600;
					margin-top: 1.25rem;
					margin-bottom: 0.75rem;
					line-height: 2rem;
				}

				.ProseMirror h3 {
					font-size: 1.25rem;
					font-weight: 600;
					margin-top: 1rem;
					margin-bottom: 0.5rem;
				}

				.ProseMirror p {
					margin-bottom: 1rem;
					line-height: 1.75;
				}

				.ProseMirror ul,
				.ProseMirror ol {
					margin-left: 1.5rem;
					margin-bottom: 1rem;
				}

				.ProseMirror li {
					margin-bottom: 0.25rem;
				}

				.ProseMirror code {
					background: rgba(255, 255, 255, 0.1);
					padding: 0.125rem 0.25rem;
					border-radius: 0.25rem;
					font-family: 'Courier New', monospace;
					font-size: 0.875em;
				}

				.ProseMirror pre {
					background: rgba(0, 0, 0, 0.5);
					padding: 1rem;
					border-radius: 0.5rem;
					margin-bottom: 1rem;
					overflow-x: auto;
				}

				.ProseMirror pre code {
					background: transparent;
					padding: 0;
				}

				.ProseMirror strong {
					font-weight: 700;
				}

				.ProseMirror em {
					font-style: italic;
				}

				.ProseMirror s {
					text-decoration: line-through;
				}

				.ProseMirror a {
					color: #f97316;
					text-decoration: underline;
				}
			`}</style>
		</div>
	);
};

export default PostEditor;
