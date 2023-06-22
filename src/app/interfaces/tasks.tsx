import { FormEvent } from 'react';

export interface TaskProps {
  key: number;
  task: any;
  editTask: (e: FormEvent<Element>) => Promise<void>;
}