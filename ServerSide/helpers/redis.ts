import { IRedis } from "../models/redis-interface";

const RedisDB = require('ioredis');

const client = new RedisDB({
  port: 5000,          // Redis port
  host: '127.0.0.1',   // Redis host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  db: 0
});

//log error to the console if any occurs
client.on("error", (err: any) =>
{
  console.log(err);
});

export class Redis implements IRedis
{
  /////////////////////////////////////////////////////////////////////////
  //Length
  public async GetLength(key: string): Promise<number>
  {
    let count = await this.LLEN(key);
    return count;
  }

  private async LLEN(key: string): Promise<number>
  {
    return client.llen(key, async (err: any, count: any) =>
    {
      if (err)
        throw err;
      return count;
    });
  }

  /////////////////////////////////////////////////////////////////////////
  //Streams

  public async GetStreams(key: string): Promise<string[]>
  {
    let range: string[] = await this.LRANGE(key);
    return range;
  }

  private async LRANGE(key: string): Promise<string[]>
  {
    //Max of 3 users per stream, thus 0-2. This should probably be configurable somewhere in the service in production
    return client.lrange(key, 0, 2, async (err: any, streams: any) =>
    {
      if (err) throw err;
      return streams;
    });
  }

  /////////////////////////////////////////////////////////////////////////
  //Add streams

  public async AddStream(key: string, value: string)
  {
    if (await this.LLEN(key) < 3)
    {
      await this.LPUSH(key, value)
    }
    else
      throw `Unable to add another user to the stream | ${ value } discarded`;
  }

  private LPUSH(key: string, value: string): Promise<void>
  {
    return client.lpush(key, value, async (err: any, streams: any) =>
    {
      if (err) throw err;
      return streams;
    });
  }
  /////////////////////////////////////////////////////////////////////////
  //Remove Streams
  public async RemoveStream(key: string): Promise<void>
  {
    await this.LPOP(key);
  }

  private async LPOP(key: string): Promise<void>
  {
    return client.lpop(key, async (err: any) =>
    {
      if (err) throw err;
    });
  }
  /////////////////////////////////////////////////////////////////////////
}