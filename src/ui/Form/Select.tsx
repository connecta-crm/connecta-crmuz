import React from 'react';

export default function Select({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  return <select name={name}>{children}</select>;
}
