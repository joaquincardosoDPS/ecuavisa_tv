import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FocusContext,
  useFocusable,
  setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import { profileService } from '@/services/profileService';
import { useFetch } from '@/hooks/useFetch';
import { FullScreenSpinner } from '@/components/ui/FullScreenSpinner';
import { isInputAction } from '@/utils/keycodes';
import type { AvatarItem } from '@/interfaces/profile.interface';
import styles from './AvatarSelectView.module.css';

// ── Focusable Avatar Button ──

function AvatarButton({
  avatar,
  isSelected,
  focusKey,
  onSelect,
  onCardFocus,
}: {
  avatar: AvatarItem;
  isSelected: boolean;
  focusKey: string;
  onSelect: () => void;
  onCardFocus?: () => void;
}) {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: onSelect,
    onFocus: () => onCardFocus?.(),
  });

  const url = avatar.images?.medium || avatar.images?.default || null;

  const classList = [
    styles.avatarBtn,
    isSelected && styles.avatarBtnSelected,
    focused && styles.avatarBtnFocused,
  ].filter(Boolean).join(' ');

  return (
    <button ref={ref} className={classList} onClick={onSelect} data-focuskey={focusKey}>
      {url ? (
        <img src={url} alt={`Avatar ${avatar.id}`} className={styles.avatarImg} draggable={false} decoding="async" />
      ) : (
        <span className={styles.avatarFallback}>?</span>
      )}
    </button>
  );
}

// ── Avatar Row (horizontal carousel) ──

function AvatarRow({
  group,
  selectedAvatar,
  onSelectAvatar,
  focusKeyPrefix,
}: {
  group: import('@/interfaces/profile.interface').AvatarGroup;
  selectedAvatar: string | null;
  onSelectAvatar: (id: string, url: string | null) => void;
  focusKeyPrefix: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const { ref, focusKey } = useFocusable({
    focusKey: focusKeyPrefix,
    saveLastFocusedChild: true,
    trackChildren: true,
  });

  const scrollToCard = useCallback((cardFocusKey: string) => {
    const track = trackRef.current;
    if (!track) return;
    const wrapper = track.parentElement;
    if (!wrapper) return;
    const child = track.querySelector(`[data-focuskey="${cardFocusKey}"]`) as HTMLElement | null;
    if (!child) return;

    const wrapperWidth = wrapper.offsetWidth;
    const childLeft = child.offsetLeft;
    const childWidth = child.offsetWidth;

    const targetX = childLeft - (wrapperWidth / 2) + (childWidth / 2);
    const maxScroll = track.scrollWidth - wrapperWidth;
    const clampedX = Math.max(0, Math.min(targetX, maxScroll));

    track.style.transform = `translateX(-${clampedX}px)`;
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref}>
        <h3 className={styles.groupTitle}>{group.name}</h3>
        <div className={styles.carouselWrapper}>
          <div ref={trackRef} className={styles.carouselTrack}>
            {group.avatars.map((avatar: AvatarItem) => {
              const key = `${focusKeyPrefix}-${avatar.id}`;
              return (
                <AvatarButton
                  key={avatar.id}
                  avatar={avatar}
                  isSelected={selectedAvatar === avatar.id}
                  focusKey={key}
                  onSelect={() => {
                    const url = avatar.images?.medium || avatar.images?.default || null;
                    onSelectAvatar(avatar.id, url);
                  }}
                  onCardFocus={() => scrollToCard(key)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}

// ── Main View ──

function AvatarSelectView() {
  const navigate = useNavigate();
  const location = useLocation();

  // Receive current avatar from navigation state
  const stateData = (location.state || {}) as {
    currentAvatar?: string | null;
    returnTo?: string;
    currentName?: string;
  };

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(stateData.currentAvatar ?? null);

  const { data: avatarsResponse, isLoading } = useFetch(
    () => profileService.getAvatars(),
    [],
  );

  const avatarGroups = avatarsResponse?.data || [];

  const { ref: containerRef, focusKey } = useFocusable({
    focusKey: 'AVATAR-SELECT-VIEW',
    saveLastFocusedChild: true,
    trackChildren: true,
  });

  // Focus first avatar row on load
  useEffect(() => {
    if (!isLoading && avatarGroups.length > 0) {
      const firstGroup = avatarGroups[0];
      if (firstGroup.avatars.length > 0) {
        setTimeout(() => setFocus(`avatar-row-0-${firstGroup.avatars[0].id}`), 300);
      }
    }
  }, [isLoading, avatarGroups]);

  const goBack = useCallback(() => {
    const returnTo = stateData.returnTo || '/mi-latina/nuevo';
    navigate(returnTo, {
      replace: true,
      state: { selectedAvatar, currentName: stateData.currentName },
    });
  }, [navigate, selectedAvatar, stateData.returnTo, stateData.currentName]);

  // Back key → go back with selected avatar
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isInputAction(e, 'Back')) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        goBack();
      }
    };
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [goBack]);

  if (isLoading) return <FullScreenSpinner />;

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={containerRef} className={styles.container}>
        <h1 className={styles.title}>Elegir avatar</h1>

        <div className={styles.avatarsScroll}>
          {avatarGroups.map((group, idx) => (
            <AvatarRow
              key={group.name}
              group={group}
              selectedAvatar={selectedAvatar}
              onSelectAvatar={(id, url) => {
                setSelectedAvatar(id);
                // Auto-return after selecting
                const returnTo = stateData.returnTo || '/mi-latina/nuevo';
                navigate(returnTo, {
                  replace: true,
                  state: { selectedAvatar: id, selectedAvatarUrl: url, currentName: stateData.currentName },
                });
              }}
              focusKeyPrefix={`avatar-row-${idx}`}
            />
          ))}
        </div>
      </div>
    </FocusContext.Provider>
  );
}

export default AvatarSelectView;
