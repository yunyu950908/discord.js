import { REST, RESTEvents } from '@discordjs/rest';
import { WebSocketManager, WebSocketShardEvents } from '@discordjs/ws';
import assert from 'assert';

const token = process.env.DISCORD_TOKEN;
assert(token, 'DISCORD_TOKEN must be set');

const rest = new REST({ version: '10', authPrefix: 'Bearer' }).setToken(token);
const mgr = new WebSocketManager({
	token,
	intents: 0,
	rest,
	shardCount: 1,
});

mgr.on(WebSocketShardEvents.Debug, (msg) => {
	console.log(msg);
});

mgr.on(WebSocketShardEvents.Closed, (msg) => {
	console.log('\n\n\n Closed', msg);
});

mgr.on(WebSocketShardEvents.Error, (msg) => {
	console.log('\n\n\n Error', msg);
});

rest.on(RESTEvents.Debug, (msg) => {
	console.log(msg);
});

await mgr.connect();
