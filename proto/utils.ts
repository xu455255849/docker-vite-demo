import { CommandBody } from './command_body_struct'
import { Message } from './message'

export function initPayload(data: CommandBody) {
  const  startCode = new Uint8Array([0xA5])
}