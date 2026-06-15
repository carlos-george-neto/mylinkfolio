import defaultAvatar from '../assets/avatar.jpg';
import type { Profile } from '../types';

interface Props {
  profile: Profile;
}

function resolveAvatarUrl(url: string | undefined): string {
  if (!url) return defaultAvatar;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  // Root-relative paths (e.g. '/assets/photo.jpg') must be prefixed with
  // Vite's BASE_URL so they resolve correctly when deployed under a sub-path
  // (e.g. GitHub Pages project sites at /repo-name/).
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${base}${path}`;
}

export default function ProfileCard({ profile }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <img
        src={resolveAvatarUrl(profile.avatarUrl)}
        alt={`${profile.name} profile photo`}
        className="rounded-2xl w-40 h-40 object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).src = defaultAvatar;
        }}
      />
      <div className="flex flex-col gap-1">
        <h1 className="font-display font-semibold text-xl text-ink">
          {profile.name}
        </h1>
        <p className="text-sm font-medium text-ink-muted">@{profile.handle}</p>
        {profile.bio && (
          <p className="text-sm text-ink-muted max-w-xs leading-relaxed">
            {profile.bio.slice(0, 160)}
          </p>
        )}
      </div>
    </div>
  );
}
