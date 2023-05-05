export enum NodeStatus {
  ONLINE = "online",
  SLOW = "slow",
  TIMEOUT = "timeout",
  ERROR = "error",
  PARSE_ERROR = "parse_error",
}

export interface NodeInfo {
  node_id: string;
  owner: string;
  status: NodeStatus;
  latency: number | null;
  response: {
    info: {
      node_id: number;
      owner: string;
    };
    pending: {
      total: number;
      messages: number;
      tasks: number;
    };
    processed: number;
    deleted: number;
    uptime: number;
  } | null;
}

export interface NodesResponse {
  status: {
    total: number;
    ok: number;
    incident: number;
  };
  nodes: NodeInfo[];
}
