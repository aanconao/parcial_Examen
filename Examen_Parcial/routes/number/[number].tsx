import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
type Phone = {
  number: string;
  country: string;
};

type Data = {
  dataPhone: Phone;
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    try {
      const { number } = ctx.params;
      if (!number) {
        return new Response("No numero ");
      }
      const apiURL =
        `https://api.api-ninjas.com/v1/validatephone?number=${number}`;
      const response = await Axios.get(apiURL, {
        headers: { "X-API-KEY": "jtU6ot7M2Ij7R7mO/07pMA==naXpuwbqCTXwqXd2" },
      });
      return ctx.render({ dataPhone: response.data });
    } catch (e) {
      console.error(e);
      return new Response("Fallo obtener API");
    }
  },
};

const Page = (props: PageProps<Data>) => {
  return (
    <div>
      <a href="/">REGRESAR</a>
      {props.data.dataPhone.number}
      <p>
        <strong>{props.data.dataPhone.country}</strong>
      </p>
      <p>
        <a href="/country">{props.data.dataPhone.country}</a>
      </p>
    </div>
  );
};

export default Page;
