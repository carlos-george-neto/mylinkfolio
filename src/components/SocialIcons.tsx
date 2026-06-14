import { resolveIcon } from '../utils/icons';
import type { SocialLink } from '../types';

interface Props {
  socialLinks?: SocialLink[];
}

export default function SocialIcons({ socialLinks }: Props) {
  if (!socialLinks || socialLinks.length === 0) return null;

  return (
    <div className="flex gap-4 justify-center">
      {socialLinks.map((link) => {
        const Icon = resolveIcon(link.icon);
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.platform}
            className="text-ink-muted hover:text-ink transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus rounded"
          >
            <Icon className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
}
