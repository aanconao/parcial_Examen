import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
type Country = {
  country: string;
};

type Data = {
  dataCOuntry: Country;
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    try {
      const { name } = ctx.params;
      if (!name) {
        return new Response("No numero ");
      }
      const apiURL = `https://api.api-ninjas.com/v1/country?name=${name}`;
      const response = await Axios.get(apiURL, {
        headers: { "X-API-KEY": "jtU6ot7M2Ij7R7mO/07pMA==naXpuwbqCTXwqXd2" },
      });
      return ctx.render({ dataCOuntry: response.data });
    } catch (e) {
      console.error(e);
      return new Response("Fallo obtener API");
    }
  },
};

const Page = (props: PageProps<Data>) => {
  return (
    <div>
      <strong>{props.data.dataCOuntry.country}</strong>
      <p>
        <a href="/city">{props.data.dataCOuntry.country}</a>
      </p>
    </div>
  );
};

export default Page;
