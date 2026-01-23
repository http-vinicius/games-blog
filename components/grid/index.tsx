type SizeColsLG =
  | 'lg:grid-cols-1'
  | 'lg:grid-cols-2'
  | 'lg:grid-cols-3'
  | 'lg:grid-cols-4'
  | 'lg:grid-cols-5'
  | 'lg:grid-cols-6'
  | 'lg:grid-cols-7'
  | 'lg:grid-cols-8'
  | 'lg:grid-cols-9'
  | 'lg:grid-cols-10'
  | 'lg:grid-cols-11'
  | 'lg:grid-cols-12';

type SizeColsMD =
  | 'md:grid-cols-1'
  | 'md:grid-cols-2'
  | 'md:grid-cols-3'
  | 'md:grid-cols-4'
  | 'md:grid-cols-5'
  | 'md:grid-cols-6'
  | 'md:grid-cols-7'
  | 'md:grid-cols-8'
  | 'md:grid-cols-9'
  | 'md:grid-cols-10'
  | 'md:grid-cols-11'
  | 'md:grid-cols-12';

type SizeColsSM =
  | 'sm:grid-cols-1'
  | 'sm:grid-cols-2'
  | 'sm:grid-cols-3'
  | 'sm:grid-cols-4'
  | 'sm:grid-cols-5'
  | 'sm:grid-cols-6'
  | 'sm:grid-cols-7'
  | 'sm:grid-cols-8'
  | 'sm:grid-cols-9'
  | 'sm:grid-cols-10'
  | 'sm:grid-cols-11'
  | 'sm:grid-cols-12';

type GridProps = {
  children: React.ReactNode;
  lg?: SizeColsLG;
  md?: SizeColsMD;
  sm?: SizeColsSM;
  styles?: string;
};

export default function Grid({ children, lg, md, sm, styles }: GridProps) {
  return (
    <div className={`${styles} grid ${lg} ${md} gap-2 ${sm}`}>{children}</div>
  );
}
