import Grid from '@/components/grid';
import { Textarea } from '@/components/ui/textarea';

const Posts = () => {
  return (
    <div className='container'>
      <Grid
        lg='lg:grid-cols-1'
        md='md:grid-cols-2'
        sm='sm:grid-cols-1'
        styles='gap-4'
      >
        <Textarea placeholder='Escreva aqui...' />
      </Grid>
    </div>
  );
};

export default Posts;
