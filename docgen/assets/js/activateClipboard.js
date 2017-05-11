import Clipboard from 'clipboard';

export default function activateClipboard(codeSamples) {
  codeSamples.forEach(codeSample => {
    const cleanAfter = 500;
    let timeout;
    const copyToClipboard = document.createElement('button');

    const setup = () => {
      clearTimeout(timeout);
      copyToClipboard.textContent = 'Copy';
      copyToClipboard.classList.remove('clipboard-done');
      copyToClipboard.classList.add('clipboard');
    };

    const done = () => {
      copyToClipboard.classList.add('clipboard-done');
      copyToClipboard.textContent = 'Copied!';
    };

    const clipboard = new Clipboard(copyToClipboard, {
      text: () => codeSample.querySelector('code').textContent,
    });

    setup();

    const heading = document.createElement('div');
    heading.className = 'heading';
    heading.innerHTML = 'Code';
    heading.appendChild(copyToClipboard);
    codeSample.insertBefore(heading, codeSample.firstChild);

    copyToClipboard.addEventListener('mouseleave', setup, true);
    clipboard.on('success', () => {
      done();
      timeout = setTimeout(setup, cleanAfter);
    });
  });
}
