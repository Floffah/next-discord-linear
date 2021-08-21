-- CreateEnum
CREATE TYPE "EventTypes" AS ENUM ('Issues', 'IssueAttachments', 'Projects', 'Labels', 'IssueComments', 'EmojiReactions', 'Cycles');

-- AlterTable
ALTER TABLE "Webhook" ADD COLUMN     "events" "EventTypes"[];
