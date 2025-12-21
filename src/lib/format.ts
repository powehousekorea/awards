/**
 * 포맷팅 관련 유틸리티 함수
 */

/**
 * 날짜 문자열을 YYYY-MM-DD 형식으로 변환
 * @param dateString - 변환할 날짜 문자열
 * @returns YYYY-MM-DD 형식의 문자열. 유효하지 않은 경우 원본 반환
 * @example formatDate('2024-12-25') // '2024-12-25'
 * @example formatDate('December 25, 2024') // '2024-12-25'
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * 날짜를 한국어 형식으로 변환
 * @param dateString - 변환할 날짜 문자열
 * @returns 'YYYY년 MM월 DD일' 형식의 문자열
 * @example formatDateKorean('2024-12-25') // '2024년 12월 25일'
 */
export function formatDateKorean(dateString: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

/**
 * 상대적 시간 표시 (예: '3일 전', '1주일 전')
 * @param dateString - 변환할 날짜 문자열
 * @returns 상대적 시간 문자열
 */
export function formatRelativeTime(dateString: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays === 1) return '어제';
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
  return `${Math.floor(diffDays / 365)}년 전`;
}
