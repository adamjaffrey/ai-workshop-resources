import {resourcePage} from './workshop-resource-page.mjs';

export const dayOnePrompt = `Help me build the first working component of an AI system for my business.

Start by asking me these five questions, one at a time:

1. What do you want to build?
2. What information will the system receive (inputs)?
3. What should it produce (result/output)?
4. What important rules should it follow?
5. How will you know when its done?

Once you have enough information:

- Recommend the simplest suitable implementation approach (such as a skill, script, web app or another solution).
- Briefly explain your recommendation, along with a short explanation for why this is the best implementation.
- Ask the user for approval to begin building the smallest useful working version immediately.
- Use manual inputs and outputs initially wherever practical.
- Help me run a real example, inspect the result and improve it.

Keep the first build tightly scoped. Defer additional features, integrations and scheduling until the core functionality works.

Ask further questions only when the answers are essential to making progress.`;

// Derive the variant from the complete shared page so styles and interactions stay in parity.
export const dayOneResourcePage = resourcePage
 .replaceAll('AI Workshop Resources', 'Day 1 Resources')
 .replaceAll('/ai-workshop-resources', '/day-1-resources')
 .replace(/<section class="step-row" aria-labelledby="resource-step-3">[\s\S]*?<\/section>/, '')
 .replace("'nodejs-setup', 'system-blueprint-creator', 'system-build-assistant'", "'nodejs-setup', 'system-blueprint-creator'")
 .replaceAll(',"step-3-system-build-assistant"', '')
 .replaceAll('step-[1-3]', 'step-[1-2]')
 .replace('function installationPrompt(skill, agent) {',
  'function installationPrompt(skill, agent) {\n      if (skill === \'system-blueprint-creator\') return ' + JSON.stringify(dayOnePrompt) + ';')
 .replace('A guided interview to turn your chosen workflow into a clear System Blueprint: what to build, what it needs, and what success looks like. After installation, follow your facilitator’s instructions.',
  'Build your AI system one brick at a time. Your agent asks five focused questions, recommends the simplest implementation approach and, with your approval, helps you build the first working component.')
 .replaceAll('System Blueprint Creator', 'System Brick Builder')
 .replaceAll('system-blueprint-creator', 'system-brick-builder');
