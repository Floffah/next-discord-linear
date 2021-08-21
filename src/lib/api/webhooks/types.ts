export type LinearWebhook = LinearIssueWebhook | LinearCommentWebhook;

export interface LinearBaseWebhook {
    action: "create" | "update" | "remove";
    createdAt: string;
    data: LinearIssueData | LinearCommentData;
    url: string;
    type: LinearEntities;
}

export interface LinearIssueWebhook extends LinearBaseWebhook {
    data: LinearIssueData;
    type: "Issue";
}

export interface LinearCommentWebhook extends LinearBaseWebhook {
    data: LinearCommentData;
    type: "Comment";
}

export type LinearEntities = "Issue" | "Comment";

export interface LinearIssueData {
    id: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    title: string;
    description: string;
    priority: number;
    boardOrder: number;
    sortOrder: number;
    previousIdentifiers: [];
    priorityLabel: string;
    teamId: string;
    stateId: string;
    assigneeId: string;
    subscriberIds: string[];
    creatorId: string;
    labelIds: string[];
    assignee: LinearAssignee;
    state: LinearState;
    team: LinearTeam;
}

export interface LinearCommentData {
    id: string;
    createdAt: string;
    updatedAt: string;
    archivedAt: string | null;
    body: string;
    edited: boolean;
    issueId: string;
    userId: string;
}

export interface LinearState {
    id: string;
    name: string;
    color: string;
    type: "backlog" | "unstarted" | "started" | "completed" | "cancelled";
}

export interface LinearAssignee {
    id: string;
    name: string;
}

export interface LinearTeam {
    id: string;
    name: string;
    key: string;
}
