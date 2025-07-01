import { selfHealingPullRequest } from './SelfHealingPR';

async function main() {
  console.log('[AI-Daemon] Listening for tasks (stub)…');

  // As placeholder, run a self-heal every hour (while true loop).
  // In real deployment connect to message queue or GitHub webhook.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      await selfHealingPullRequest('scheduled');
    } catch (err) {
      console.error('[AI-Daemon] Error:', err);
    }
    await new Promise((r) => setTimeout(r, 60 * 60 * 1000));
  }
}

main().catch((e) => console.error(e));