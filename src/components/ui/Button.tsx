import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button = ({ label, ...rest }: Props) => (
  <button className="bg-blue-600 text-white px-4 py-2 rounded" {...rest}>{label}</button>
);
