import { getTranslations } from 'next-intl/server';
import { closedWeekdays, groupByDay, hhmm } from '@/lib/hours';
import { OpenNow } from './OpenNow';
import type { OpeningHour } from '@/lib/types';

// Openingsuren als tekst op de pagina. Op de oude site stonden ze nergens:
// enkel verstopt in de structured data die alleen Google leest.
export async function Hours({ hours }: { hours: OpeningHour[] }) {
  const t = await getTranslations('hours');
  const days = groupByDay(hours);
  const closed = closedWeekdays(hours);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">
          {t('title')}
        </h3>
        <OpenNow hours={hours} />
      </div>
      <dl className="text-sm">
        {days.map(({ weekday, services }) => (
          <div
            key={weekday}
            className="flex items-baseline gap-3 border-b border-rule/60 py-2 last:border-0"
          >
            <dt className="w-28 shrink-0 text-ink-soft">
              {t(`days.${weekday}`)}
            </dt>
            <dd className="tabular-nums [font-variant-numeric:tabular-nums]">
              {services.length === 0
                ? t('closed')
                : services
                    .map((s) => `${hhmm(s.opens)} - ${hhmm(s.closes)}`)
                    .join('  |  ')}
            </dd>
          </div>
        ))}
      </dl>
      {closed.length > 0 && (
        <p className="mt-3 text-sm text-ink-soft">{t('closedDays')}</p>
      )}
    </div>
  );
}
