# Developers

## Testing webhooks

To test the endpoints, create the following entities in prisma:

```
Endpoint {
    id: IhQq_PqQTuiBJRd1oGvOB
    enabled: true
    hookId: id from webhook url -> https://discord.com/api/webhooks/ --> id <-- /token
    hookToken: token from webhook url -> https://discord.com/api/webhooks/id/ --> token <--
}
```

Then, run this curl command (which uses examples from [Linears docs](https://developers.linear.app/docs/graphql/webhooks#how-does-a-webhook-work))

```shell
curl --request POST \
  --url http://localhost:3000/api/endpoints/IhQq_PqQTuiBJRd1oGvOB \
  --header 'Content-Type: application/json' \
  --header 'Linear-Delivery: 234d1a4e-b617-4388-90fe-adc3633d6b72' \
  --header 'Linear-Event: Issue' \
  --header 'User-Agent: Linear-Webhook' \
  --data '{
  "action": "create",
  "createdAt": "2021-08-21T13:15:32.402Z",
  "data": {
    "id": "example.-id..-test-1234-567890123456",
    "createdAt": "2021-08-21T13:15:32.402Z",
    "updatedAt": "2021-08-21T13:15:32.402Z",
    "number": 18,
    "title": "testtesttest",
    "description": "testtesttest",
    "priority": 0,
    "boardOrder": 0,
    "sortOrder": 0,
    "previousIdentifiers": [],
    "priorityLabel": "No priority",
    "teamId": "example.-id..-test-1234-567890123456",
    "stateId": "example.-id..-test-1234-567890123456",
    "assigneeId": "example.-id..-test-1234-567890123456",
    "subscriberIds": [
      "example.-id..-test-1234-567890123456"
    ],
    "creatorId": "example.-id..-test-1234-567890123456",
    "labelIds": [],
    "assignee": {
      "id": "example.-id..-test-1234-567890123456",
      "name": "Floffah"
    },
    "state": {
      "id": "example.-id..-test-1234-567890123456",
      "name": "Backlog",
      "color": "#bec2c8",
      "type": "backlog"
    },
    "team": {
      "id": "055922c2-6408-4a51-ae22-0ff36a271338",
      "name": "Development",
      "key": "DEV"
    }
  },
  "url": "https://linear.app/test-org/issue/DEV-18/testtesttest",
  "type": "Issue"
}'
```

If you copy this curl command, you can import it into Insomnia by creating a collection, then 
next to Dashboard / collection-name press the down arrow and press import/export, then import 
data, from clipboard, current
