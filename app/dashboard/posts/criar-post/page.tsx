'use client';

import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';

type PostPayload = {
  title: string;
  slug: string;
  excerpt: string;
  contentJson: any;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function uploadImage(file: File): Promise<string> {
  // ✅ Troque esse endpoint pelo seu (/api/upload) — igual eu mostrei antes
  const form = new FormData();
  form.append('file', file);

  const res = await fetch('/api/upload', { method: 'POST', body: form });
  if (!res.ok) throw new Error('Falha ao enviar imagem');

  const data = (await res.json()) as { url: string };
  return data.url;
}

const ToolbarButton = ({
  active,
  disabled,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) => (
  <button
    type='button'
    title={title}
    disabled={disabled}
    onClick={onClick}
    className={[
      'rounded-md border px-3 py-1 text-sm transition',
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted',
      active ? 'bg-muted font-medium' : '',
    ].join(' ')}
  >
    {children}
  </button>
);

const CriarPost = () => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [excerpt, setExcerpt] = React.useState('');

  const [autoSlug, setAutoSlug] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const [contentJson, setContentJson] = React.useState<any>(null);

  const editor = useEditor({
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setContentJson(editor.getJSON());
    },
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] }, // vamos usar Heading com levels configurados
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Escreva o conteúdo do post aqui...',
      }),
    ],
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: '' }],
        },
      ],
    },
    editorProps: {
      attributes: {
        class:
          'min-h-[280px] rounded-md border p-4 focus:outline-none ' +
          'prose max-w-none dark:prose-invert ' +
          'prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-6 prose-h2:mb-2 ' +
          'prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-5 prose-h3:mb-2 ' +
          'prose-h4:text-lg prose-h4:font-semibold prose-h4:mt-4 prose-h4:mb-2',
      },
    },
  });

  React.useEffect(() => {
    if (!autoSlug) return;
    setSlug(slugify(title));
  }, [title, autoSlug]);

  async function handlePickImage(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];
      if (!file || !editor) return;

      const url = await uploadImage(file);

      editor
        .chain()
        .focus()
        .setImage({ src: url, alt: file.name, title: file.name })
        .run();

      e.target.value = '';
    } catch (err) {
      console.error(err);
      alert('Não foi possível enviar a imagem.');
    }
  }

  function setLink() {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Cole a URL:', previousUrl ?? '');

    if (url === null) return; // cancelou
    if (url.trim() === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().setLink({ href: url.trim() }).run();
  }

  async function handleSave() {
    if (!editor) return;

    const payload: PostPayload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      contentJson: editor.getJSON(),
    };

    if (!payload.title) return alert('Digite o título.');
    if (!payload.slug) return alert('Digite o slug.');
    if (!payload.excerpt) return alert('Digite o resumo.');
    if (!payload.contentJson?.content?.length)
      return alert('Digite o conteúdo.');

    try {
      setSaving(true);

      // ✅ Troque para seu endpoint real (ex: POST /api/posts)
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Falha ao salvar post');

      alert('Post salvo!');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar post.');
    } finally {
      setSaving(false);
    }
  }

  if (!editor) return null;

  const canUndo = editor.can().chain().focus().undo().run();
  const canRedo = editor.can().chain().focus().redo().run();

  return (
    <div className='mx-auto w-full max-w-4xl space-y-6 p-6'>
      <div className='space-y-2'>
        <h1 className='text-2xl font-semibold'>Criar post</h1>
        <p className='text-sm text-muted-foreground'>
          Use H2/H3/H4 dentro do conteúdo. O H1 fica para o título do post.
        </p>
      </div>

      {/* Campos do post */}
      <div className='grid gap-4 rounded-md border p-4'>
        <div className='grid gap-2'>
          <label className='text-sm font-medium'>Título</label>
          <input
            className='h-10 rounded-md border px-3'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Ex: GTA 6 pode ser adiado, dizem rumores...'
          />
        </div>

        <div className='grid gap-2'>
          <div className='flex items-center justify-between gap-3'>
            <label className='text-sm font-medium'>Slug</label>
            <label className='flex items-center gap-2 text-sm text-muted-foreground'>
              <input
                type='checkbox'
                checked={autoSlug}
                onChange={(e) => setAutoSlug(e.target.checked)}
              />
              Gerar automaticamente
            </label>
          </div>

          <input
            className='h-10 rounded-md border px-3'
            value={slug}
            onChange={(e) => {
              setAutoSlug(false);
              setSlug(e.target.value);
            }}
            placeholder='gta-6-pode-ser-adiado'
          />
        </div>

        <div className='grid gap-2'>
          <label className='text-sm font-medium'>Resumo</label>
          <textarea
            className='min-h-[90px] rounded-md border px-3 py-2'
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder='Um resumo curto para listagem/SEO...'
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className='flex flex-wrap gap-2 rounded-md border p-3'>
        <ToolbarButton
          title='Desfazer'
          disabled={!canUndo}
          onClick={() => editor.chain().focus().undo().run()}
        >
          Undo
        </ToolbarButton>
        <ToolbarButton
          title='Refazer'
          disabled={!canRedo}
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo
        </ToolbarButton>

        <div className='mx-1 h-7 w-px bg-border' />

        <ToolbarButton
          title='Negrito'
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </ToolbarButton>
        <ToolbarButton
          title='Itálico'
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </ToolbarButton>
        <ToolbarButton
          title='Sublinhado'
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          Underline
        </ToolbarButton>
        <ToolbarButton
          title='Riscado'
          active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          Strike
        </ToolbarButton>

        <div className='mx-1 h-7 w-px bg-border' />

        <ToolbarButton
          title='H2'
          active={editor.isActive('heading', { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          title='H3'
          active={editor.isActive('heading', { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          title='H4'
          active={editor.isActive('heading', { level: 4 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          H4
        </ToolbarButton>
        <ToolbarButton
          title='Parágrafo'
          active={editor.isActive('paragraph')}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          P
        </ToolbarButton>

        <div className='mx-1 h-7 w-px bg-border' />

        <ToolbarButton
          title='Lista'
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • Lista
        </ToolbarButton>
        <ToolbarButton
          title='Lista numerada'
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. Lista
        </ToolbarButton>
        <ToolbarButton
          title='Citação'
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </ToolbarButton>
        <ToolbarButton
          title='Linha'
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          HR
        </ToolbarButton>

        <div className='mx-1 h-7 w-px bg-border' />

        <ToolbarButton
          title='Alinhar à esquerda'
          active={editor.isActive({ textAlign: 'left' })}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          Left
        </ToolbarButton>
        <ToolbarButton
          title='Centralizar'
          active={editor.isActive({ textAlign: 'center' })}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          Center
        </ToolbarButton>
        <ToolbarButton
          title='Alinhar à direita'
          active={editor.isActive({ textAlign: 'right' })}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          Right
        </ToolbarButton>
        <ToolbarButton
          title='Justificar'
          active={editor.isActive({ textAlign: 'justify' })}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        >
          Justify
        </ToolbarButton>

        <div className='mx-1 h-7 w-px bg-border' />

        <ToolbarButton
          title='Adicionar/editar link'
          active={editor.isActive('link')}
          onClick={setLink}
        >
          Link
        </ToolbarButton>
        <ToolbarButton
          title='Remover link'
          disabled={!editor.isActive('link')}
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          Unlink
        </ToolbarButton>

        <div className='mx-1 h-7 w-px bg-border' />

        <ToolbarButton
          title='Upload de imagem'
          onClick={() => fileInputRef.current?.click()}
        >
          Imagem
        </ToolbarButton>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          hidden
          onChange={handlePickImage}
        />
      </div>

      {/* Editor */}
      <div className='rounded-md border p-3'>
        <EditorContent editor={editor} />
      </div>

      {/* Ações */}
      <div className='flex items-center justify-end gap-2'>
        <button
          type='button'
          onClick={() => {
            editor.chain().focus().clearContent().run();
            setTitle('');
            setSlug('');
            setExcerpt('');
            setAutoSlug(true);
          }}
          className='rounded-md border px-4 py-2'
          disabled={saving}
        >
          Limpar
        </button>

        <button
          type='button'
          onClick={handleSave}
          className='rounded-md border px-4 py-2 font-medium'
          disabled={saving}
        >
          {saving ? 'Salvando...' : 'Salvar post'}
        </button>
      </div>

      {/* Debug opcional: ver JSON */}
      <details className='rounded-md border p-4'>
        <summary className='cursor-pointer text-sm font-medium'>
          Ver JSON do conteúdo (debug)
        </summary>
        <pre className='mt-3 overflow-auto rounded bg-muted p-3 text-xs'>
          {JSON.stringify(contentJson, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default CriarPost;
