// @generated by protobuf-ts 2.9.0
// @generated from protobuf file "command_body_struct.proto" (package "tv.yunxi.protobuf", syntax proto3)
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
import { MessageType } from "@protobuf-ts/runtime";
import { Rect } from "./body/body_rect";
import { Range } from "./body/body_range";
import { Size } from "./body/body_size";
import { TransportFile } from "./body/body_transport_file";
import { WhiteBalanceManual } from "./body/body_white_balance";
import { ManualExposureParams } from "./body/body_manual_exposure";
/**
 * @generated from protobuf message tv.yunxi.protobuf.CommandBody
 */
export interface CommandBody {
    /**
     * @generated from protobuf oneof: value
     */
    value: {
        oneofKind: "intVal";
        /**
         * @generated from protobuf field: uint32 int_val = 1;
         */
        intVal: number;
    } | {
        oneofKind: "strVal";
        /**
         * @generated from protobuf field: string str_val = 2;
         */
        strVal: string;
    } | {
        oneofKind: "exposureParams";
        /**
         * @generated from protobuf field: tv.yunxi.protobuf.body.ManualExposureParams exposure_params = 3;
         */
        exposureParams: ManualExposureParams;
    } | {
        oneofKind: "whiteBalanceManual";
        /**
         * @generated from protobuf field: tv.yunxi.protobuf.body.WhiteBalanceManual white_balance_manual = 4;
         */
        whiteBalanceManual: WhiteBalanceManual;
    } | {
        oneofKind: "transportFile";
        /**
         * @generated from protobuf field: tv.yunxi.protobuf.body.TransportFile transport_File = 5;
         */
        transportFile: TransportFile;
    } | {
        oneofKind: "size";
        /**
         * @generated from protobuf field: tv.yunxi.protobuf.body.Size size = 6;
         */
        size: Size;
    } | {
        oneofKind: "range";
        /**
         * @generated from protobuf field: tv.yunxi.protobuf.body.Range range = 7;
         */
        range: Range;
    } | {
        oneofKind: "rect";
        /**
         * @generated from protobuf field: tv.yunxi.protobuf.body.Rect rect = 8;
         */
        rect: Rect;
    } | {
        oneofKind: undefined;
    };
}
// @generated message type with reflection information, may provide speed optimized methods
class CommandBody$Type extends MessageType<CommandBody> {
    constructor() {
        super("tv.yunxi.protobuf.CommandBody", [
            { no: 1, name: "int_val", kind: "scalar", oneof: "value", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "str_val", kind: "scalar", oneof: "value", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "exposure_params", kind: "message", oneof: "value", T: () => ManualExposureParams },
            { no: 4, name: "white_balance_manual", kind: "message", oneof: "value", T: () => WhiteBalanceManual },
            { no: 5, name: "transport_File", kind: "message", oneof: "value", T: () => TransportFile },
            { no: 6, name: "size", kind: "message", oneof: "value", T: () => Size },
            { no: 7, name: "range", kind: "message", oneof: "value", T: () => Range },
            { no: 8, name: "rect", kind: "message", oneof: "value", T: () => Rect }
        ]);
    }
    create(value?: PartialMessage<CommandBody>): CommandBody {
        const message = { value: { oneofKind: undefined } };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<CommandBody>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CommandBody): CommandBody {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 int_val */ 1:
                    message.value = {
                        oneofKind: "intVal",
                        intVal: reader.uint32()
                    };
                    break;
                case /* string str_val */ 2:
                    message.value = {
                        oneofKind: "strVal",
                        strVal: reader.string()
                    };
                    break;
                case /* tv.yunxi.protobuf.body.ManualExposureParams exposure_params */ 3:
                    message.value = {
                        oneofKind: "exposureParams",
                        exposureParams: ManualExposureParams.internalBinaryRead(reader, reader.uint32(), options, (message.value as any).exposureParams)
                    };
                    break;
                case /* tv.yunxi.protobuf.body.WhiteBalanceManual white_balance_manual */ 4:
                    message.value = {
                        oneofKind: "whiteBalanceManual",
                        whiteBalanceManual: WhiteBalanceManual.internalBinaryRead(reader, reader.uint32(), options, (message.value as any).whiteBalanceManual)
                    };
                    break;
                case /* tv.yunxi.protobuf.body.TransportFile transport_File */ 5:
                    message.value = {
                        oneofKind: "transportFile",
                        transportFile: TransportFile.internalBinaryRead(reader, reader.uint32(), options, (message.value as any).transportFile)
                    };
                    break;
                case /* tv.yunxi.protobuf.body.Size size */ 6:
                    message.value = {
                        oneofKind: "size",
                        size: Size.internalBinaryRead(reader, reader.uint32(), options, (message.value as any).size)
                    };
                    break;
                case /* tv.yunxi.protobuf.body.Range range */ 7:
                    message.value = {
                        oneofKind: "range",
                        range: Range.internalBinaryRead(reader, reader.uint32(), options, (message.value as any).range)
                    };
                    break;
                case /* tv.yunxi.protobuf.body.Rect rect */ 8:
                    message.value = {
                        oneofKind: "rect",
                        rect: Rect.internalBinaryRead(reader, reader.uint32(), options, (message.value as any).rect)
                    };
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
    internalBinaryWrite(message: CommandBody, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint32 int_val = 1; */
        if (message.value.oneofKind === "intVal")
            writer.tag(1, WireType.Varint).uint32(message.value.intVal);
        /* string str_val = 2; */
        if (message.value.oneofKind === "strVal")
            writer.tag(2, WireType.LengthDelimited).string(message.value.strVal);
        /* tv.yunxi.protobuf.body.ManualExposureParams exposure_params = 3; */
        if (message.value.oneofKind === "exposureParams")
            ManualExposureParams.internalBinaryWrite(message.value.exposureParams, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* tv.yunxi.protobuf.body.WhiteBalanceManual white_balance_manual = 4; */
        if (message.value.oneofKind === "whiteBalanceManual")
            WhiteBalanceManual.internalBinaryWrite(message.value.whiteBalanceManual, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* tv.yunxi.protobuf.body.TransportFile transport_File = 5; */
        if (message.value.oneofKind === "transportFile")
            TransportFile.internalBinaryWrite(message.value.transportFile, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        /* tv.yunxi.protobuf.body.Size size = 6; */
        if (message.value.oneofKind === "size")
            Size.internalBinaryWrite(message.value.size, writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        /* tv.yunxi.protobuf.body.Range range = 7; */
        if (message.value.oneofKind === "range")
            Range.internalBinaryWrite(message.value.range, writer.tag(7, WireType.LengthDelimited).fork(), options).join();
        /* tv.yunxi.protobuf.body.Rect rect = 8; */
        if (message.value.oneofKind === "rect")
            Rect.internalBinaryWrite(message.value.rect, writer.tag(8, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message tv.yunxi.protobuf.CommandBody
 */
export const CommandBody = new CommandBody$Type();
