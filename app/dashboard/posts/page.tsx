'use client';

import Grid from '@/components/grid';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const dadosMock = [
  {
    id: 0,
    titulo: 'Primeiro Post',
    conteudo: 'Conteúdo do primeiro post',
  },
  {
    id: 1,
    titulo: 'Segundo Post',
    conteudo: 'Conteúdo do segundo post',
  },
  {
    id: 2,
    titulo: 'Terceiro Post',
    conteudo: 'Conteúdo do terceiro post',
  },
  {
    id: 3,
    titulo: 'Quarto Post',
    conteudo: 'Conteúdo do quarto post',
  },
  {
    id: 4,
    titulo: 'Quinto Post',
    conteudo: 'Conteúdo do quinto post',
  },
  {
    id: 5,
    titulo: 'Sexto Post',
    conteudo: 'Conteúdo do sexto post',
  },
  {
    id: 6,
    titulo: 'Sétimo Post',
    conteudo: 'Conteúdo do sétimo post',
  },
  {
    id: 7,
    titulo: 'Oitavo Post',
    conteudo: 'Conteúdo do oitavo post',
  },
  {
    id: 8,
    titulo: 'Nono Post',
    conteudo: 'Conteúdo do nono post',
  },
];

const Posts = () => {
  return (
    <div className='container'>
      <Grid styles='grid grid-flow-col justify-items-end pb-5'>
        <Button onClick={() => {}}>Criar Post</Button>
      </Grid>
      <Grid lg='lg:grid-cols-4' styles={'gap-4'}>
        {dadosMock.map((post) => (
          <Grid
            lg='lg:grid-cols-1'
            md='md:grid-cols-2'
            sm='sm:grid-cols-1'
            styles='gap-4'
          >
            <Card key={post.id} className='w-full'>
              <CardHeader>{post.titulo}</CardHeader>
              <CardContent>{post.conteudo}</CardContent>
              <CardFooter>botões</CardFooter>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Posts;
