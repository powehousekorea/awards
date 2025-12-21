import { AWARD_CONFIG, SECTOR_CONFIG } from '@/lib/award-utils';

type BadgeType = 'award' | 'category' | 'sector' | 'status';

interface BadgeProps {
  type: BadgeType;
  value: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'metallic' | 'outline';
  className?: string;
}

// 카테고리(공지 유형)별 스타일
const CATEGORY_STYLES: Record<string, { label: string; className: string }> = {
  notice: {
    label: '공지',
    className: 'bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-[inset_0_1px_0_rgba(251,191,36,0.1)]'
  },
  event: {
    label: '이벤트',
    className: 'bg-violet-500/10 text-violet-300 border-violet-500/30 shadow-[inset_0_1px_0_rgba(139,92,246,0.1)]'
  },
  update: {
    label: '업데이트',
    className: 'bg-sky-500/10 text-sky-300 border-sky-500/30 shadow-[inset_0_1px_0_rgba(14,165,233,0.1)]'
  },
  news: {
    label: '뉴스',
    className: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-[inset_0_1px_0_rgba(16,185,129,0.1)]'
  },
};

// 상태 뱃지 스타일
const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  new: {
    label: 'NEW',
    className: 'bg-red-500/15 text-red-400 border-red-500/30 animate-pulse'
  },
  important: {
    label: '중요',
    className: 'bg-red-500/15 text-red-400 border-red-500/30'
  },
  hot: {
    label: 'HOT',
    className: 'bg-orange-500/15 text-orange-400 border-orange-500/30'
  },
};

// 사이즈별 클래스 - 세련된 패딩과 폰트
const SIZE_CLASSES = {
  sm: 'text-[9px] px-2 py-0.5 tracking-wider',
  md: 'text-[10px] px-2.5 py-1 tracking-wide',
  lg: 'text-[11px] px-3 py-1.5 tracking-wide',
};

// Award 타입별 메탈릭 스타일
const AWARD_METALLIC_STYLES: Record<string, string> = {
  grand: `
    bg-gradient-to-br from-gold-300/20 via-gold-400/10 to-gold-500/20
    text-gold-200 border-gold-400/40
    shadow-[inset_0_1px_0_rgba(212,184,134,0.3),0_1px_2px_rgba(0,0,0,0.2)]
  `,
  excellence: `
    bg-gradient-to-br from-gray-300/15 via-gray-400/10 to-gray-500/15
    text-gray-200 border-gray-400/40
    shadow-[inset_0_1px_0_rgba(163,163,163,0.2),0_1px_2px_rgba(0,0,0,0.2)]
  `,
  merit: `
    bg-gradient-to-br from-amber-600/15 via-amber-700/10 to-amber-800/15
    text-amber-300 border-amber-500/40
    shadow-[inset_0_1px_0_rgba(180,83,9,0.2),0_1px_2px_rgba(0,0,0,0.2)]
  `,
  innovation: `
    bg-gradient-to-br from-emerald-500/15 via-emerald-600/10 to-emerald-700/15
    text-emerald-300 border-emerald-500/40
    shadow-[inset_0_1px_0_rgba(16,185,129,0.2),0_1px_2px_rgba(0,0,0,0.2)]
  `,
  global: `
    bg-gradient-to-br from-teal-500/15 via-teal-600/10 to-teal-700/15
    text-teal-300 border-teal-500/40
    shadow-[inset_0_1px_0_rgba(20,184,166,0.2),0_1px_2px_rgba(0,0,0,0.2)]
  `,
  special: `
    bg-gradient-to-br from-purple-500/15 via-purple-600/10 to-purple-700/15
    text-purple-300 border-purple-500/40
    shadow-[inset_0_1px_0_rgba(139,92,246,0.2),0_1px_2px_rgba(0,0,0,0.2)]
  `,
};

export default function Badge({
  type,
  value,
  size = 'md',
  variant = 'default',
  className = ''
}: BadgeProps) {
  let label: string;
  let styleClass: string;

  switch (type) {
    case 'award': {
      const config = AWARD_CONFIG[value];
      label = config?.shortLabel ?? value;

      if (variant === 'metallic' && AWARD_METALLIC_STYLES[value]) {
        styleClass = AWARD_METALLIC_STYLES[value];
      } else if (value === 'grand') {
        styleClass = 'bg-gold-500/15 text-gold-300 border-gold-400/40';
      } else if (value === 'excellence') {
        styleClass = 'bg-gray-400/15 text-gray-300 border-gray-400/40';
      } else if (value === 'merit') {
        styleClass = 'bg-amber-600/15 text-amber-400 border-amber-500/40';
      } else if (value === 'innovation') {
        styleClass = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';
      } else if (value === 'global') {
        styleClass = 'bg-teal-500/15 text-teal-300 border-teal-500/40';
      } else if (value === 'special') {
        styleClass = 'bg-purple-500/15 text-purple-300 border-purple-500/40';
      } else {
        styleClass = 'bg-dark-700/50 text-dark-300 border-dark-600/40';
      }
      break;
    }
    case 'sector': {
      const config = SECTOR_CONFIG[value];
      label = config?.label ?? value;
      styleClass = 'bg-dark-800/60 text-dark-300 border-dark-600/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]';
      break;
    }
    case 'category': {
      const config = CATEGORY_STYLES[value];
      label = config?.label ?? value;
      styleClass = config?.className ?? 'bg-dark-700/50 text-dark-300 border-dark-600/50';
      break;
    }
    case 'status': {
      const config = STATUS_STYLES[value];
      label = config?.label ?? value;
      styleClass = config?.className ?? 'bg-dark-700/50 text-dark-300 border-dark-600/50';
      break;
    }
    default:
      label = value;
      styleClass = 'bg-dark-700/50 text-dark-300 border-dark-600/50';
  }

  return (
    <span
      className={`
        inline-flex items-center justify-center
        font-semibold uppercase
        rounded border
        transition-all duration-200
        ${SIZE_CLASSES[size]}
        ${styleClass}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {label}
    </span>
  );
}

// 편의를 위한 특화 컴포넌트들
export function AwardBadge({
  value,
  size = 'md',
  variant = 'default',
  className = ''
}: Omit<BadgeProps, 'type'>) {
  return <Badge type="award" value={value} size={size} variant={variant} className={className} />;
}

export function SectorBadge({ value, size = 'md', className = '' }: Omit<BadgeProps, 'type'>) {
  return <Badge type="sector" value={value} size={size} className={className} />;
}

export function CategoryBadge({ value, size = 'md', className = '' }: Omit<BadgeProps, 'type'>) {
  return <Badge type="category" value={value} size={size} className={className} />;
}

export function StatusBadge({ value, size = 'sm', className = '' }: Omit<BadgeProps, 'type'>) {
  return <Badge type="status" value={value} size={size} className={className} />;
}
