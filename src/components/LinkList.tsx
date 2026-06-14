import LinkButton from './LinkButton';
import type { LinkItem } from '../types';

interface Props {
  links: LinkItem[];
}

export default function LinkList({ links }: Props) {
  if (links.length === 0) return null;

  return (
    <ul className="flex flex-col gap-3 w-full">
      {links.map((link, index) => (
        <li
          key={link.id}
          className="animate-fade-up"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <LinkButton link={link} />
        </li>
      ))}
    </ul>
  );
}
