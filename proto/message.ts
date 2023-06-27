// @generated by protobuf-ts 2.9.0
// @generated from protobuf file "message.proto" (package "tv.yunxi.protobuf", syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType as MessageType$ } from "@protobuf-ts/runtime";
import { CommandBody } from "./command_body_struct";
import { CommandId } from "./command_id_enum";
import { MessageType } from "./message_type_enum";
/**
 * @generated from protobuf message tv.yunxi.protobuf.Message
 */
export interface Message {
    /**
     * @generated from protobuf field: tv.yunxi.protobuf.MessageType type = 1;
     */
    type: MessageType;
    /**
     * @generated from protobuf field: uint32 seq = 2;
     */
    seq: number;
    /**
     * @generated from protobuf field: uint32 timeout = 3;
     */
    timeout: number;
    /**
     * @generated from protobuf field: uint32 resp_code = 4;
     */
    respCode: number;
    /**
     * @generated from protobuf field: tv.yunxi.protobuf.CommandId id = 5;
     */
    id: CommandId;
    /**
     * @generated from protobuf field: tv.yunxi.protobuf.CommandBody body = 6;
     */
    body?: CommandBody;
}
// @generated message type with reflection information, may provide speed optimized methods
class Message$Type extends MessageType$<Message> {
    constructor() {
        super("tv.yunxi.protobuf.Message", [
            { no: 1, name: "type", kind: "enum", T: () => ["tv.yunxi.protobuf.MessageType", MessageType] },
            { no: 2, name: "seq", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "timeout", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 4, name: "resp_code", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 5, name: "id", kind: "enum", T: () => ["tv.yunxi.protobuf.CommandId", CommandId] },
            { no: 6, name: "body", kind: "message", T: () => CommandBody }
        ]);
    }
    create(value?: PartialMessage<Message>): Message {
        const message = { type: 0, seq: 0, timeout: 0, respCode: 0, id: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Message>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Message): Message {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* tv.yunxi.protobuf.MessageType type */ 1:
                    message.type = reader.int32();
                    break;
                case /* uint32 seq */ 2:
                    message.seq = reader.uint32();
                    break;
                case /* uint32 timeout */ 3:
                    message.timeout = reader.uint32();
                    break;
                case /* uint32 resp_code */ 4:
                    message.respCode = reader.uint32();
                    break;
                case /* tv.yunxi.protobuf.CommandId id */ 5:
                    message.id = reader.int32();
                    break;
                case /* tv.yunxi.protobuf.CommandBody body */ 6:
                    message.body = CommandBody.internalBinaryRead(reader, reader.uint32(), options, message.body);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Message, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* tv.yunxi.protobuf.MessageType type = 1; */
        if (message.type !== 0)
            writer.tag(1, WireType.Varint).int32(message.type);
        /* uint32 seq = 2; */
        if (message.seq !== 0)
            writer.tag(2, WireType.Varint).uint32(message.seq);
        /* uint32 timeout = 3; */
        if (message.timeout !== 0)
            writer.tag(3, WireType.Varint).uint32(message.timeout);
        /* uint32 resp_code = 4; */
        if (message.respCode !== 0)
            writer.tag(4, WireType.Varint).uint32(message.respCode);
        /* tv.yunxi.protobuf.CommandId id = 5; */
        if (message.id !== 0)
            writer.tag(5, WireType.Varint).int32(message.id);
        /* tv.yunxi.protobuf.CommandBody body = 6; */
        if (message.body)
            CommandBody.internalBinaryWrite(message.body, writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message tv.yunxi.protobuf.Message
 */
export const Message = new Message$Type();
