import { FC } from "react";
import styled from "styled-components";
import { NodeInfo, NodeStatus } from "./interfaces";
import { uptimeToString } from "./utils";

interface NodeProps {
  idx: number;
  node: NodeInfo;
}

const Node: FC<NodeProps> = ({ idx, node }) => {
  return (
    <Container>
      <Bold>
        Node{idx + 1}: {nodeStatusMap[node.status]}
      </Bold>
      {[NodeStatus.ONLINE, NodeStatus.SLOW].includes(node.status) &&
        node.response && (
          <>
            <Text>관리자: {node.response.info.owner}</Text>
            <Text>메인 서버와의 응답 시간: {node.latency}ms</Text>
            <Text>{node.response.pending.messages}개의 매시지 대기 중</Text>
            <Text>{node.response.pending.tasks}개의 전송 태스크 대기 중</Text>
            <Text>
              {node.response.processed.toLocaleString()}개의 메시지 전송 됨
            </Text>
            <Text>{uptimeToString(node.response.uptime)} 동안 실행됨</Text>
          </>
        )}
    </Container>
  );
};

export default Node;

const nodeStatusMap = {
  [NodeStatus.ONLINE]: "온라인",
  [NodeStatus.SLOW]: "응답이 느림",
  [NodeStatus.TIMEOUT]: "응답 없음",
  [NodeStatus.ERROR]: "오류1",
  [NodeStatus.PARSE_ERROR]: "오류2",
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-top: 2rem;
`;

const Bold = styled.span`
  font-weight: 600;
`;

const Text = styled.span``;
