import AsyncRetry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return AsyncRetry(fetchStatusPage, {
      retries: 100, //Aumenta a quantidade de tentativas do retry antes de dar erro
      maxTimeout: 5000, //Determina o tempo de espera de uma tentativa e outra
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

export default {
  waitForAllServices,
};
