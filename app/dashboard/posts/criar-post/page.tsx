'use client';

import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import * as React from 'react';

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading2,
  Heading3,
  Heading4,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  Save,
  Strikethrough,
  Trash2,
  Underline as UnderlineIcon,
  Undo2,
  Unlink,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
  const form = new FormData();
  form.append('file', file);

  const res = await fetch('/api/upload', { method: 'POST', body: form });
  if (!res.ok) throw new Error('Falha ao enviar imagem');

  const data = (await res.json()) as { url: string };
  return data.url;
}

function ToolbarIconButton({
  icon,
  label,
  onClick,
  active,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type='button'
            variant={active ? 'secondary' : 'outline'}
            size='icon'
            disabled={disabled}
            onClick={onClick}
            className={cn('h-9 w-9', active && 'border-primary/40')}
          >
            {icon}
            <span className='sr-only'>{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function EditorToolbar({
  editor,
  onPickImageClick,
}: {
  editor: NonNullable<ReturnType<typeof useEditor>>;
  onPickImageClick: () => void;
}) {
  const canUndo = editor.can().chain().focus().undo().run();
  const canRedo = editor.can().chain().focus().redo().run();

  return (
    <div className='flex flex-wrap items-center gap-2 rounded-md border bg-background p-3'>
      <ToolbarIconButton
        label='Desfazer'
        disabled={!canUndo}
        onClick={() => editor.chain().focus().undo().run()}
        icon={<Undo2 className='h-4 w-4' />}
      />
      <ToolbarIconButton
        label='Refazer'
        disabled={!canRedo}
        onClick={() => editor.chain().focus().redo().run()}
        icon={<Redo2 className='h-4 w-4' />}
      />

      <Separator orientation='vertical' className='mx-1 h-7' />

      <ToolbarIconButton
        label='Negrito'
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
        icon={<Bold className='h-4 w-4' />}
      />
      <ToolbarIconButton
        label='Itálico'
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        icon={<Italic className='h-4 w-4' />}
      />
      <ToolbarIconButton
        label='Sublinhado'
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        icon={<UnderlineIcon className='h-4 w-4' />}
      />
      <ToolbarIconButton
        label='Riscado'
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        icon={<Strikethrough className='h-4 w-4' />}
      />

      <Separator orientation='vertical' className='mx-1 h-7' />

      <ToolbarIconButton
        label='Título H2'
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        icon={<Heading2 className='h-4 w-4' />}
      />
      <ToolbarIconButton
        label='Título H3'
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        icon={<Heading3 className='h-4 w-4' />}
      />
      <ToolbarIconButton
        label='Título H4'
        active={editor.isActive('heading', { level: 4 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        icon={<Heading4 className='h-4 w-4' />}
      />
      <ToolbarIconButton
        label='Parágrafo'
        active={editor.isActive('paragraph')}
        onClick={() => editor.chain().focus().setParagraph().run()}
        icon={<Pilcrow className='h-4 w-4' />}
      />

      <Separator orientation='vertical' className='mx-1 h-7' />

      <ToolbarIconButton
        label='Lista'
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        icon={<List className='h-4 w-4' />}
      />
      <ToolbarIconButton
        label='Lista numerada'
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        icon={<ListOrdered className='h-4 w-4' />}
      />
      <ToolbarIconButton
        label='Citação'
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        icon={<Quote className='h-4 w-4' />}
      />
      <ToolbarIconButton
        label='Linha horizontal'
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        icon={<Minus className='h-4 w-4' />}
      />
      {/* <ToolbarIconButton
        label='Citação (Blockquote)'
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        icon={<Quote className='h-4 w-4' />}
      /> */}

      <Separator orientation='vertical' className='mx-1 h-7' />

      <ToolbarIconButton
        label='Alinhar à esquerda'
        active={editor.isActive({ textAlign: 'left' })}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        icon={<AlignLeft className='h-4 w-4' />}
      />
      <ToolbarIconButton
        label='Centralizar'
        active={editor.isActive({ textAlign: 'center' })}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        icon={<AlignCenter className='h-4 w-4' />}
      />
      <ToolbarIconButton
        label='Alinhar à direita'
        active={editor.isActive({ textAlign: 'right' })}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        icon={<AlignRight className='h-4 w-4' />}
      />
      <ToolbarIconButton
        label='Justificar'
        active={editor.isActive({ textAlign: 'justify' })}
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        icon={<AlignJustify className='h-4 w-4' />}
      />

      <Separator orientation='vertical' className='mx-1 h-7' />

      <ToolbarIconButton
        label='Adicionar/editar link'
        active={editor.isActive('link')}
        onClick={() => {
          const previousUrl = editor.getAttributes('link').href as
            | string
            | undefined;
          const url = window.prompt('Cole a URL:', previousUrl ?? '');
          if (url === null) return;
          if (url.trim() === '') {
            editor.chain().focus().unsetLink().run();
            return;
          }
          editor.chain().focus().setLink({ href: url.trim() }).run();
        }}
        icon={<LinkIcon className='h-4 w-4' />}
      />
      <ToolbarIconButton
        label='Remover link'
        disabled={!editor.isActive('link')}
        onClick={() => editor.chain().focus().unsetLink().run()}
        icon={<Unlink className='h-4 w-4' />}
      />

      <Separator orientation='vertical' className='mx-1 h-7' />

      <ToolbarIconButton
        label='Upload de imagem'
        onClick={onPickImageClick}
        icon={<ImageIcon className='h-4 w-4' />}
      />
    </div>
  );
}

export default function CriarPost() {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [excerpt, setExcerpt] = React.useState('');

  const [autoSlug, setAutoSlug] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const [contentJson, setContentJson] = React.useState<any>(null);

  const editor = useEditor({
    immediatelyRender: false,
    onUpdate: ({ editor }) => setContentJson(editor.getJSON()),
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
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
      content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }],
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
      window.alert('Não foi possível enviar a imagem.');
    }
  }

  async function handleSave() {
    if (!editor) return;

    const payload: PostPayload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      contentJson: editor.getJSON(),
    };

    if (!payload.title) return window.alert('Digite o título.');
    if (!payload.slug) return window.alert('Digite o slug.');
    if (!payload.excerpt) return window.alert('Digite o resumo.');
    if (!payload.contentJson?.content?.length)
      return window.alert('Digite o conteúdo.');

    try {
      setSaving(true);

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Falha ao salvar post');

      window.alert('Post salvo!');
    } catch (err) {
      console.error(err);
      window.alert('Erro ao salvar post.');
    } finally {
      setSaving(false);
    }
  }

  function handleClear() {
    if (!editor) return;
    editor.chain().focus().clearContent().run();
    setTitle('');
    setSlug('');
    setExcerpt('');
    setAutoSlug(true);
  }

  if (!editor) return null;

  return (
    <div className='mx-auto w-full max-w-4xl space-y-6 p-6'>
      <div className='space-y-2'>
        <h1 className='text-2xl font-semibold'>Criar post</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados do post</CardTitle>
          <CardDescription>
            Preencha título, slug e resumo. O conteúdo é editado abaixo.
          </CardDescription>
        </CardHeader>

        <CardContent className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='title'>Título</Label>
            <Input
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Ex: GTA 6 pode ser adiado, dizem rumores...'
            />
          </div>

          <div className='grid gap-2'>
            <div className='flex items-center justify-between gap-4'>
              <Label htmlFor='slug'>Slug</Label>

              <div className='flex items-center gap-2'>
                <Switch
                  id='autoSlug'
                  checked={autoSlug}
                  onCheckedChange={(checked) => setAutoSlug(checked)}
                />
                <Label
                  htmlFor='autoSlug'
                  className='text-sm font-normal text-muted-foreground'
                >
                  Gerar automaticamente
                </Label>
              </div>
            </div>

            <Input
              id='slug'
              value={slug}
              onChange={(e) => {
                setAutoSlug(false);
                setSlug(e.target.value);
              }}
              placeholder='gta-6-pode-ser-adiado'
            />
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='excerpt'>Resumo</Label>
            <Textarea
              id='excerpt'
              className='min-h-[90px]'
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder='Um resumo curto para listagem/SEO...'
            />
          </div>
        </CardContent>

        <CardFooter className='justify-end gap-2'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='outline' disabled={saving}>
                <Trash2 className='mr-2 h-4 w-4' />
                Limpar
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Limpar formulário?</AlertDialogTitle>
                <AlertDialogDescription>
                  Isso vai apagar título, slug, resumo e limpar o conteúdo do
                  editor.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleClear} className='gap-2'>
                  Limpar agora
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button onClick={handleSave} disabled={saving}>
            <Save className='mr-2 h-4 w-4' />
            {saving ? 'Salvando...' : 'Salvar post'}
          </Button>
        </CardFooter>
      </Card>

      <div className='space-y-3'>
        <EditorToolbar
          editor={editor}
          onPickImageClick={() => fileInputRef.current?.click()}
        />

        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          hidden
          onChange={handlePickImage}
        />

        <Card>
          <CardHeader>
            <CardTitle>Conteúdo</CardTitle>
            <CardDescription>
              Escreva e formate o conteúdo do post.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                // 🔹 Blockquote estilo editorial (Medium-like)
                '[&_blockquote]:border-l-2',
                '[&_blockquote]:border-primary',
                '[&_blockquote]:pl-4',
                '[&_blockquote]:ml-1',
                '[&_blockquote]:my-6',

                // 🔹 Texto limpo (sem itálico pesado)
                '[&_blockquote]:not-italic',
                '[&_blockquote_p]:text-foreground',
                '[&_blockquote_p]:leading-relaxed'
              )}
            >
              <EditorContent editor={editor} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>JSON do conteúdo (debug)</CardTitle>
          <CardDescription>
            Útil para conferir o output que será salvo no backend.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className='h-[260px] w-full rounded-md border bg-muted'>
            <pre className='p-3 text-xs'>
              {JSON.stringify(contentJson, null, 2)}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
