import Image from "next/image";

export interface AwardItem {
  id: string;
  title: string;
  description?: string | null;
  year?: string | null;
  image?: string | null;
}

const PRESET_ICONS: Record<string, { icon: string; name: string; gradient: string }> = {
  'gold-medal': { icon: '🥇', name: 'Золота медаль', gradient: 'from-amber-400 via-yellow-500 to-amber-600' },
  'silver-medal': { icon: '🥈', name: 'Срібна медаль', gradient: 'from-slate-300 via-gray-400 to-slate-500' },
  'bronze-medal': { icon: '🥉', name: 'Бронзова медаль', gradient: 'from-amber-600 via-amber-700 to-amber-900' },
  'grand-prix': { icon: '🏆', name: 'Гран-прі', gradient: 'from-yellow-300 via-amber-400 to-yellow-600' },
  'sommelier-choice': { icon: '🍷', name: 'Вибір Сомельє', gradient: 'from-purple-500 via-rose-600 to-rose-800' },
  'star-award': { icon: '⭐️', name: 'Зірка якості', gradient: 'from-amber-300 via-yellow-400 to-amber-500' },
};

function getBadgeDisplay(award: AwardItem) {
  if (award.image && award.image.startsWith('preset:')) {
    const key = award.image.replace('preset:', '');
    const preset = PRESET_ICONS[key] || { icon: '🏅', name: 'Нагорода', gradient: 'from-amber-400 to-yellow-600' };
    return { isPreset: true, icon: preset.icon, gradient: preset.gradient };
  } else if (award.image) {
    return { isPreset: false, image: award.image };
  }
  return { isPreset: true, icon: '🏅', gradient: 'from-amber-400 to-yellow-600' };
}

export function BeverageAwardsSection({ awards }: { awards: AwardItem[] }) {
  if (!awards || awards.length === 0) return null;

  return (
    <section className="bg-gradient-to-br from-amber-500/5 via-yellow-500/5 to-amber-600/10 rounded-2xl p-6 sm:p-8 border border-amber-200/60 dark:border-amber-500/20 shadow-sm relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🏆</span>
        <div>
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wider">
            Нагороди та відзнаки
          </h2>
          <p className="text-xs text-gray-500">Визнання та високі оцінки експертів</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {awards.map((award) => {
          const badge = getBadgeDisplay(award);
          return (
            <div
              key={award.id}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-amber-100 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 group"
            >
              {/* Badge Icon / Image */}
              <div className="relative w-14 h-14 flex-shrink-0 rounded-2xl flex items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-50 border border-amber-200/80 shadow-inner overflow-hidden group-hover:scale-105 transition-transform duration-300">
                {badge.isPreset ? (
                  <span className="text-3xl filter drop-shadow">{badge.icon}</span>
                ) : (
                  <Image
                    src={badge.image!}
                    alt={award.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-gray-900 text-base leading-snug">
                    {award.title}
                  </h3>
                  {award.year && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      {award.year}
                    </span>
                  )}
                </div>
                {award.description && (
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {award.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function BeverageBadgePill({ awards }: { awards?: AwardItem[] }) {
  if (!awards || awards.length === 0) return null;

  const topAward = awards[0];
  const badge = getBadgeDisplay(topAward);

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/15 to-amber-600/15 border border-amber-400/30 text-amber-900 text-xs font-semibold shadow-xs backdrop-blur-xs">
      {badge.isPreset ? (
        <span>{badge.icon}</span>
      ) : (
        <span className="relative w-4 h-4 rounded-full overflow-hidden inline-block">
          <Image src={badge.image!} alt={topAward.title} fill className="object-cover" />
        </span>
      )}
      <span className="truncate max-w-[160px]">{topAward.title}</span>
      {awards.length > 1 && (
        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-200/80 text-amber-950 font-bold">
          +{awards.length - 1}
        </span>
      )}
    </div>
  );
}
