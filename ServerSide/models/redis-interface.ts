export interface IRedis
{
  GetLength(key: string): Promise<number>
  GetStreams(key: string): Promise<string[]>
  AddStream(key: string, value: string): Promise<void>
  RemoveStream(key: string): Promise<void>;
}