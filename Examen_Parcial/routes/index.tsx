import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
  number?: string;
};

export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext<Data>) => {
    const url = new URL(req.url);
    const number = url.searchParams.get("number") || undefined;
    if (number) {
      return new Response("", {
        status: 302,
        headers: {
          Location: `/number/${number}`,
        },
      });
    }
    return ctx.render({ number });
  },
};

const Page = (props: PageProps<Data>) => {
  return (
    <div>
      <a href="/">REGRESAR</a>
      <h1>Telefono</h1>
      <form method="get">
        <input type="text" name="number" value={props.data.number || ""} />
        <button type="submit">BUSCAR</button>
      </form>
    </div>
  );
};

export default Page;
