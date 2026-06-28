import { createBdd, test } from 'playwright-bdd';
import { expect, type Locator, type Page } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

const SYSTEM_CONFIG_IFRAME = 'iframe[src*="source=systemConfig"]';

function textRegex(text: string): RegExp {
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(escaped, 'i');
}

async function firstVisible(
  page: Page,
  candidates: Locator[],
  description: string,
  timeout = 15000
): Promise<Locator> {
  const endTime = Date.now() + timeout;

  while (Date.now() < endTime) {
    for (const candidate of candidates) {
      const target = candidate.first();

      if (await target.isVisible().catch(() => false)) {
        return target;
      }
    }

    await page.waitForTimeout(200);
  }

  throw new Error(`Bulunamadı: ${description}`);
}

async function clickButton(page: Page, buttonText: string): Promise<void> {
  const buttonName = textRegex(buttonText);
  const frame = page.frameLocator(SYSTEM_CONFIG_IFRAME);

  const button = await firstVisible(
    page,
    [
      // Ana sayfa butonları: Giriş vb.
      page.getByRole('button', { name: buttonName }),
      page.getByRole('link', { name: buttonName }),
      page
        .locator('.v-button, button, a, [role="button"]')
        .filter({ hasText: buttonName }),
      page.locator(
        `input[type="submit"][value="${buttonText}"],
         input[type="button"][value="${buttonText}"]`
      ),

      // iframe içindeki butonlar: Sorgula vb.
      frame.getByRole('button', { name: buttonName }),
      frame.getByRole('link', { name: buttonName }),
      frame
        .locator('.v-button, button, a, [role="button"]')
        .filter({ hasText: buttonName }),
      frame.locator(
        `input[type="submit"][value="${buttonText}"],
         input[type="button"][value="${buttonText}"]`
      )
    ],
    `${buttonText} butonu`
  );

  await button.click();
}

async function findCaptchaField(page: Page): Promise<Locator> {
  return firstVisible(
    page,
    [
      page.getByLabel(/captcha|doğrulama|verification/i),
      page.getByRole('textbox', {
        name: /captcha|doğrulama|verification/i
      }),
      page.locator(
        'input[name*="captcha" i], input[id*="captcha" i], input[placeholder*="captcha" i]'
      )
    ],
    'Captcha alanı'
  );
}

/* ---------- FEATURE ADIMLARI ---------- */

Given('kullanıcı {string} sayfasını açar', async ({ page }, url: string) => {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
});

When(
  'Kullanıcı adı alanına {string}, şifre alanına {string}, captcha alanına {string} yazar',
  async (
    { page },
    username: string,
    password: string,
    captcha: string
  ) => {
    const usernameField = await firstVisible(
      page,
      [
        page.getByLabel(/kullanıcı adı|kullanıcı|username|user/i),
        page.getByRole('textbox', {
          name: /kullanıcı adı|kullanıcı|username|user/i
        }),
        page.locator(
          'input[name*="user" i], input[id*="user" i], input[placeholder*="kullanıcı" i]'
        )
      ],
      'Kullanıcı adı alanı'
    );

    await usernameField.fill(username);

    const passwordField = await firstVisible(
      page,
      [
        page.getByLabel(/şifre|password|pass/i),
        page.locator(
          'input[type="password"], input[name*="pass" i], input[id*="pass" i]'
        )
      ],
      'Şifre alanı'
    );

    await passwordField.fill(password);

    const captchaField = await findCaptchaField(page);
    await captchaField.fill(captcha);
  }
);

When('Enter tuşuna basar', async ({ page }) => {
  const captchaField = await findCaptchaField(page);
  await captchaField.press('Enter');
});

When('{string} butonuna tıklar', async ({ page }, buttonText: string) => {
  await clickButton(page, buttonText);
});

When(
  'Ekranda {string} yazısını görene kadar bekler',
  async ({ page }, text: string) => {
    await expect(page.locator('body')).toContainText(textRegex(text), {
      timeout: 15000
    });
  }
);

When(
  '{string} menüsünden {string} ekranını açar',
  async ({ page }, menuName: string, screenName: string) => {
    const menuText = textRegex(menuName);

    const menu = await firstVisible(
      page,
      [
        page.getByRole('menuitem', { name: menuText }),
        page.getByRole('button', { name: menuText }),
        page.getByRole('link', { name: menuText }),
        page
          .locator('.v-menubar-menuitem, .v-button, a, button, [role="menuitem"]')
          .filter({ hasText: menuText })
      ],
      `${menuName} menüsü`
    );

    await menu.click();

    const screenText = textRegex(screenName);

    const screen = await firstVisible(
      page,
      [
        page.getByRole('menuitem', { name: screenText }),
        page.getByRole('button', { name: screenText }),
        page.getByRole('link', { name: screenText }),
        page
          .locator('.v-menubar-menuitem, .v-button, a, button, [role="menuitem"]')
          .filter({ hasText: screenText })
      ],
      `${screenName} ekranı`
    );

    await screen.click();
  }
);

When(
  '{string} textbox alanına {string} yazar',
  async ({ page }, fieldName: string, value: string) => {
    const frame = page.frameLocator(SYSTEM_CONFIG_IFRAME);
    const fieldNameRegex = textRegex(fieldName);

    const label = frame.getByText(fieldName, { exact: true });

    const textbox = await firstVisible(
      page,
      [
        frame.getByLabel(fieldNameRegex),
        frame.getByRole('textbox', { name: fieldNameRegex }),

        label.locator(`xpath=following::*[
          self::input[
            not(@type='hidden')
            and not(@type='checkbox')
            and not(@type='radio')
            and not(@disabled)
          ]
          or self::textarea[not(@disabled)]
        ][1]`),

        frame.locator(
          'input[placeholder*="Parametre" i], input[name*="parametre" i], input[id*="parametre" i]'
        ),

        frame.locator(
          'input[type="text"]:not([disabled]), textarea:not([disabled])'
        )
      ],
      `${fieldName} textbox alanı`
    );

    await textbox.fill(value);
    await page.waitForTimeout(5000);
  }
);

Then(
  '{string} mesajının ekranda görüldüğü doğrulanır',
  async ({ page }, expectedMessage: string) => {
    const frame = page.frameLocator(SYSTEM_CONFIG_IFRAME);

    await expect(
      frame.getByText(expectedMessage, { exact: false })
    ).toBeVisible({ timeout: 10000 });
  }
);

Then(
  'Sistem Konfigürasyonu Listesi altında {string} listelendiği görülür',
  async ({ page }, paramName: string) => {
    const frame = page.frameLocator(SYSTEM_CONFIG_IFRAME);
    const paramNameRegex = textRegex(paramName);

    await expect(frame.locator('body')).toContainText(
      /Sistem Konfigürasyonu Listesi/i,
      { timeout: 15000 }
    );

    const result = await firstVisible(
      page,
      [
        frame.locator('tr, [role="row"]').filter({
          hasText: paramNameRegex
        }),
        frame.locator('td, [role="cell"]').filter({
          hasText: paramNameRegex
        }),
        frame.getByText(paramNameRegex)
      ],
      `${paramName} parametre kaydı`
    );

    await expect(result).toBeVisible();
  }
);