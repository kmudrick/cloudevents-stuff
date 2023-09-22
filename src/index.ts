import { CloudEvent, HTTP, Kafka } from "cloudevents";
import { z } from "zod";

export const Foo = z.object({
  foo: z.object({
    bar: z.boolean(),
  }),
  thing: z.number().int(),
});

export type Foo = z.infer<typeof Foo>;

const event: CloudEvent<Foo> = new CloudEvent({
  type: "myapp.Foo",
  source: "MyApp",
  data: {
    foo: {
      bar: true,
    },
    thing: 0,
  },
});

// generates id, time, specversion

console.log(event);

const httpMessage = HTTP.binary(event);
console.log(httpMessage);

// Looks like
// {
//   headers: {
//     'content-type': 'application/json; charset=utf-8',
//     'ce-id': 'b2d975bd-c972-4e7e-812d-08dce431655f',
//     'ce-time': '2023-09-22T06:29:19.352Z',
//     'ce-type': 'myapp.Foo',
//     'ce-source': 'MyApp',
//     'ce-specversion': '1.0'
//   },
//   body: '{"foo":{"bar":true},"thing":0}'
// }

const kafkaMessage = Kafka.binary(event);
console.log(kafkaMessage);

// Looks like
// {
//     headers: {
//       'content-type': undefined,
//       ce_id: 'b2d975bd-c972-4e7e-812d-08dce431655f',
//       ce_time: '2023-09-22T06:29:19.352Z',
//       ce_type: 'myapp.Foo',
//       ce_source: 'MyApp',
//       ce_specversion: '1.0',
//       ce_datacontenttype: undefined,
//       ce_subject: undefined,
//       ce_datacontentencoding: undefined,
//       ce_dataschema: undefined,
//       ce_schemaurl: undefined
//     },
//     key: undefined,
//     value: { foo: { bar: true }, thing: 0 },
//     body: { foo: { bar: true }, thing: 0 },
//     timestamp: '1695364159352'
// }
