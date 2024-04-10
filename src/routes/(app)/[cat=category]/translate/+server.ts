
export async function GET({ context }) {
    return context.env.TRANZAURUS.fetch(context.request);
}
