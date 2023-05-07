type KV_Keys = 'BACKEND_URL' | 'WEBHOOK_URL' | 'ts_message_id';
type Env_Keys =
	| 'QSTASH_CURRENT_SIGNING_KEY'
	| 'QSTASH_NEXT_SIGNING_KEY'
	| 'QSTASH_TOKEN'
	| 'DISCORD_APP_ID'
	| 'DISCORD_PUBLIC_KEY'
	| 'DISCORD_BOT_TOKEN';

export interface Env extends Record<Env_Keys, string> {
	TS_BOT: KVNamespace<KV_Keys>;
}
