import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://dev.presscentric.com/interview-test/graphql',
  cache: new InMemoryCache(),
});

const ACCOUNT_NAMES = {
  query: gql`
    query {
      accounts {
        id
        nameFirst
        nameLast
      }
    }
  `,
};

const ACCOUNT_DETAILS = (id) => ({
  query: gql`
    query {
      account(id: ${id}) {
        id
        nameFirst
        nameLast
        email
        ip
      }
    }
  `,
});

export async function fetchDatalist() {
  const query = await client.query(ACCOUNT_NAMES);
  const data = query.data.accounts;
  const transformData = data.map((el) => ({
    id: el.id,
    name: `${el.nameFirst} ${el.nameLast}`,
  }));
  return transformData;
}

export async function fetchAccount(id) {
  const query = await client.query(ACCOUNT_DETAILS(id));
  const data = await query.data.account;
  console.log({ data });
  return await data;
}
