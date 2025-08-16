import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Import all avatar images
import influencerPatriot1 from '@/assets/avatars/influencer-patriot-1.webp';
import presidential1 from '@/assets/avatars/presidential-1.webp';
import presidential2 from '@/assets/avatars/presidential-2.webp';
import presidential3 from '@/assets/avatars/presidential-3.webp';
import pacEmblem1 from '@/assets/avatars/pac-emblem-1.webp';
import creator1 from '@/assets/avatars/creator1.jpg';
import creator2 from '@/assets/avatars/creator2.jpg';
import creator3 from '@/assets/avatars/creator3.jpg';
import creator4 from '@/assets/avatars/creator4.jpg';

interface ProfileAvatarProps {
  avatarUrl?: string | null;
  displayName?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProfileAvatar = ({ avatarUrl, displayName, size = 'md', className }: ProfileAvatarProps) => {
  // Map avatar URLs to imported images
  const avatarMap: Record<string, string> = {
    '/src/assets/avatars/influencer-patriot-1.webp': influencerPatriot1,
    '/src/assets/avatars/presidential-1.webp': presidential1,
    '/src/assets/avatars/presidential-2.webp': presidential2,
    '/src/assets/avatars/presidential-3.webp': presidential3,
    '/src/assets/avatars/pac-emblem-1.webp': pacEmblem1,
    '/src/assets/avatars/creator1.jpg': creator1,
    '/src/assets/avatars/creator2.jpg': creator2,
    '/src/assets/avatars/creator3.jpg': creator3,
    '/src/assets/avatars/creator4.jpg': creator4,
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const imageSource = avatarUrl && avatarMap[avatarUrl] ? avatarMap[avatarUrl] : avatarUrl;

  return (
    <Avatar className={`${sizeClasses[size]} ${className || ''}`}>
      <AvatarImage 
        src={imageSource || ''} 
        alt={`${displayName || 'User'} profile picture`}
        className="object-cover"
      />
      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
        {displayName?.charAt(0)?.toUpperCase() || 'U'}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;