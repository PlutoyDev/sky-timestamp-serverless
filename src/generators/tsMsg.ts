import { DateTime, Duration } from 'luxon';
import {
	RESTPostAPIWebhookWithTokenJSONBody as SendMessageBody,
	RESTPatchAPIWebhookWithTokenMessageJSONBody as EditMessageBody,
} from 'discord-api-types/v10';

export default function tsMsg() {
	const now = DateTime.now().setZone('America/Los_Angeles');

	const geyserDuration = Duration.fromObject({ minutes: 15 });
	const dinnerDuration = Duration.fromObject({ minutes: 15 });
	const turtleDuration = Duration.fromObject({ minutes: 10 });

	const geyserEndOffset = Duration.fromObject({ minutes: 15 });
	const dinnerEndOffset = Duration.fromObject({ minutes: 45 });
	const turtleEndOffset = Duration.fromObject({ minutes: 60 });

	const getNextEnd = (endOffset: Duration, periodHour = 2) => {
		const nextHour = now.hour < periodHour ? periodHour - now.hour : now.hour + (now.hour % periodHour);
		const end = DateTime.fromObject({ hour: nextHour }, { zone: 'America/Los_Angeles' }).plus(endOffset);
		return end < now ? end.plus({ hour: periodHour }) : end;
	};

	const geyserNextEnd = getNextEnd(geyserEndOffset);
	const dinnerNextEnd = getNextEnd(dinnerEndOffset);
	const turtleNextEnd = getNextEnd(turtleEndOffset);

	const geyserStart = geyserNextEnd.minus(geyserDuration);
	const dinnerStart = dinnerNextEnd.minus(dinnerDuration);
	const turtleStart = turtleNextEnd.minus(turtleDuration);

	const nextTrigger = DateTime.min(
		...[geyserNextEnd, dinnerNextEnd, turtleNextEnd, geyserStart, dinnerStart, turtleStart].filter(dt => dt > now),
	);

	const discRelFmt = `'<t:'X':R>'`;

	const messageBody: SendMessageBody | EditMessageBody = {
		embeds: [
			{
				title: 'Timestamps',
				timestamp: now.toISO() as string,
				fields: [
					{
						name: '<:s06Sanctuary:741938722706292739> Geyser',
						start: geyserStart,
						end: geyserNextEnd,
					},
					{
						name: '<:s03Belonging:768438826007527425> Dinner',
						start: dinnerStart,
						end: dinnerNextEnd,
					},
					{
						name: '<:carlnap:882655981929119775> Turtle',
						start: turtleStart,
						end: turtleNextEnd,
					},
				]
					.sort((a, b) => a.end.toMillis() - b.end.toMillis())
					.map(({ name, start, end }) => {
						const started = now >= start && now < end;
						return {
							name,
							value: started ? `Started, Ending ${end.toFormat(discRelFmt)}` : `Starting ${start.toFormat(discRelFmt)}`,
						};
					}),
			},
		],
	};

	return {
		nextTrigger,
		messageBody,
	};
}
