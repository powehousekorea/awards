/**
 * Award 관련 유틸리티 함수 및 상수
 * 수상 타입, 부문 라벨, 배지 스타일 등을 중앙 관리
 */

// 수상 타입 정렬 순서
export const AWARD_TYPE_ORDER = [
  'grand',
  'excellence',
  'merit',
  'innovation',
  'global',
  'special',
  'best',
  'trending',
  'effort',
  'potential',
] as const;

export type AwardType = (typeof AWARD_TYPE_ORDER)[number];

// 수상 타입별 설정 (라벨, 배지 클래스, 아이콘, 색상)
export const AWARD_CONFIG: Record<
  string,
  {
    label: string;
    shortLabel: string;
    className: string;
    icon: string;
    color: string;
  }
> = {
  // 2024~ 상 부문
  grand: {
    label: '청년정책 대상',
    shortLabel: '대상',
    className: 'badge-grand',
    icon: '🥇',
    color: '#D4B886',
  },
  excellence: {
    label: '최우수 청년정책상',
    shortLabel: '최우수상',
    className: 'badge-excellence',
    icon: '🥈',
    color: '#a3a3a3',
  },
  merit: {
    label: '우수 청년정책상',
    shortLabel: '우수상',
    className: 'badge-merit',
    icon: '🥉',
    color: '#8b8b8b',
  },
  innovation: {
    label: '청년정책 혁신상',
    shortLabel: '혁신상',
    className: 'badge-innovation',
    icon: '💡',
    color: '#34d399',
  },
  global: {
    label: '글로벌 청년정책상',
    shortLabel: '글로벌상',
    className: 'badge-global',
    icon: '🌍',
    color: '#7dd3c0',
  },
  special: {
    label: '특별상',
    shortLabel: '특별상',
    className: 'badge-special',
    icon: '⭐',
    color: '#a78bfa',
  },
  // 2023 상 부문
  best: {
    label: '열고닫기 최우수상',
    shortLabel: 'Best',
    className: 'badge-best',
    icon: '🏆',
    color: '#D4B886',
  },
  trending: {
    label: '갑자기떡상',
    shortLabel: '떡상',
    className: 'badge-trending',
    icon: '📈',
    color: '#f472b6',
  },
  effort: {
    label: '노력은가상',
    shortLabel: '노력상',
    className: 'badge-effort',
    icon: '💪',
    color: '#fbbf24',
  },
  potential: {
    label: '왕이될관상',
    shortLabel: '가능성상',
    className: 'badge-potential',
    icon: '👑',
    color: '#a78bfa',
  },
};

// 부문(섹터) 설정
export const SECTOR_CONFIG: Record<string, { label: string; order: number }> = {
  government: { label: '정부', order: 0 },
  local: { label: '지자체', order: 1 },
  corporate: { label: '기업', order: 2 },
  nonprofit: { label: 'NGO', order: 3 },
};

/**
 * 수상 타입의 전체 라벨 반환
 * @example getAwardLabel('grand') // '청년정책 대상'
 */
export function getAwardLabel(type: string): string {
  return AWARD_CONFIG[type]?.label ?? 'Award';
}

/**
 * 수상 타입의 짧은 라벨 반환
 * @example getAwardShortLabel('grand') // '대상'
 */
export function getAwardShortLabel(type: string): string {
  return AWARD_CONFIG[type]?.shortLabel ?? 'Award';
}

/**
 * 수상 타입의 배지 클래스 반환
 * @example getAwardBadgeClass('grand') // 'badge-grand'
 */
export function getAwardBadgeClass(type: string): string {
  return AWARD_CONFIG[type]?.className ?? 'badge-merit';
}

/**
 * 수상 타입의 아이콘 반환
 * @example getAwardIcon('grand') // '🥇'
 */
export function getAwardIcon(type: string): string {
  return AWARD_CONFIG[type]?.icon ?? '🏆';
}

/**
 * 수상 타입의 색상 반환
 * @example getAwardColor('grand') // '#D4B886'
 */
export function getAwardColor(type: string): string {
  return AWARD_CONFIG[type]?.color ?? '#8b8b8b';
}

/**
 * 부문(섹터) 라벨 반환
 * @example getSectorLabel('government') // '정부'
 */
export function getSectorLabel(sector: string | undefined): string | null {
  if (!sector) return null;
  return SECTOR_CONFIG[sector]?.label ?? null;
}

/**
 * 부문(섹터) 정렬 순서 반환
 * @example getSectorOrder('government') // 0
 */
export function getSectorOrder(sector: string | undefined): number {
  if (!sector) return 99;
  return SECTOR_CONFIG[sector]?.order ?? 99;
}

/**
 * 수상 타입 정렬 순서 반환
 * @example getAwardTypeOrder('grand') // 0
 */
export function getAwardTypeOrder(type: string): number {
  const index = AWARD_TYPE_ORDER.indexOf(type as AwardType);
  return index === -1 ? 99 : index;
}

/**
 * 수상작 배열을 타입 → 섹터 순으로 정렬
 */
export function sortAwards<T extends { awardType: string; sector?: string }>(
  awards: T[]
): T[] {
  return [...awards].sort((a, b) => {
    // 먼저 awardType으로 정렬
    const typeOrderA = getAwardTypeOrder(a.awardType);
    const typeOrderB = getAwardTypeOrder(b.awardType);
    if (typeOrderA !== typeOrderB) return typeOrderA - typeOrderB;

    // 같은 타입이면 sector로 정렬
    const sectorOrderA = getSectorOrder(a.sector);
    const sectorOrderB = getSectorOrder(b.sector);
    return sectorOrderA - sectorOrderB;
  });
}
