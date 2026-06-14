import { resolveIcon } from '../utils/icons';
import type { LinkItem } from '../types';

interface Props {
  link: LinkItem;
}

export default function LinkButton({ link }: Props) {
  const Icon = resolveIcon(link.icon);

  const baseClasses =
    'flex items-center gap-3 w-full px-5 py-4 rounded-xl font-medium text-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus';

  const colorClasses = link.highlighted
    ? 'bg-primary text-on-primary hover:bg-primary-hover'
    : 'bg-surface-1 text-ink hover:bg-surface-2';

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.title}
      className={`${baseClasses} ${colorClasses}`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span>{link.title}</span>
    </a>
  );
}
