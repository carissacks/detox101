import { device, expect } from 'detox';

describe('Login', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show login scene', async () => {
    await expect(element(by.text('Login'))).toBeVisible();
    await expect(element(by.text('Hey, welcome back!'))).toBeVisible();
  });

  it('should show error message after submitting empty form', async () => {
    await element(by.text('SUBMIT')).tap(); // case sensitive
    await expect(element(by.text('Tell me who you are.'))).toBeVisible();
  });

  it('should show error message with wrong credentials', async () => {
    await element(by.id('username')).typeText('kfox');
    await element(by.id('password')).typeText('123');

    await element(by.text('SUBMIT')).tap();
    await expect(
      element(by.text('Sorry, we have never met before')),
    ).toBeVisible();
  });

  it('should login successfully', async () => {
    await element(by.id('username')).replaceText('detox101');
    await element(by.id('password')).replaceText('123');

    await element(by.text('SUBMIT')).tap();
    await waitFor(element(by.text('Home')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
