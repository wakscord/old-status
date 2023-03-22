import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { NodesResponse } from "./interfaces";
import Node from "./Node";
import { uptimeToString } from "./utils";

const App: FC = () => {
  const [response, setResponse] = useState<NodesResponse | false | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.wakscord.xyz/nodes");

      if (!response.ok) {
        setResponse(false);
        return;
      }

      const data = await response.json();

      setResponse(data);
    })();
  }, []);

  return (
    <Container>
      <Logo src="/logo.png" alt="logo" />
      {response === null ? (
        <Text>로딩 중...</Text>
      ) : response === false ? (
        <Text>메인 서버 응답하지 않음</Text>
      ) : (
        <InfoContainer>
          <Text>
            현재 {response.status.total}개의 노드가 연결되어 있습니다.
          </Text>

          <Text>{response.status.ok}개의 정상 노드</Text>
          <Text>{response.status.incident}개의 문제가 있는 노드</Text>

          <br />

          <Text>
            {uptimeToString(
              Math.max(
                ...response.nodes.map((node) => node.response?.uptime || 0)
              )
            )}{" "}
            동안{" "}
            {response.nodes
              .map((node) => node.response?.processed || 0)
              .reduce((a, b) => a + b)
              .toLocaleString()}
            개의 메시지가 전송 됨
          </Text>

          {response.nodes.map((node, idx) => (
            <Node key={idx} idx={idx} node={node} />
          ))}
        </InfoContainer>
      )}
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 24rem;

  margin-top: 5.5rem;

  user-select: none;
  -webkit-user-drag: none;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 3rem;
  margin-bottom: 5rem;
`;

const Text = styled.span``;
