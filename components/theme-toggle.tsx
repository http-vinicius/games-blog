'use client';

import { Moon, Sun } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import * as React from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  //  {isDark ? '☀️ Light' : '🌙 Dark'

  return (
    <div className='flex items-center space-x-2 w-32'>
      <Switch
        id='airplane-mode'
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <Label htmlFor='airplane-mode'>{isDark ? <Sun /> : <Moon />}</Label>
    </div>
  );
}
