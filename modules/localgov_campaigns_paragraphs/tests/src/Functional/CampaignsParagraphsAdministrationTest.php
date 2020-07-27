<?php

namespace Drupal\Tests\localgov_campaigns_paragraphs\Functional;

use Drupal\Tests\paragraphs\Functional\Classic\ParagraphsTestBase;

/**
 * Tests the configuration of localgov_paragraphs.
 */
class CampaignsParagraphsAdministrationTest extends ParagraphsTestBase {

  /**
   * Modules to enable.
   *
   * @var array
   */
  public static $modules = [
    'localgov_campaigns_paragraphs',
  ];

  /**
   * Tests the LocalGovDrupal core paragraph types.
   */
  public function testCampaignParagraphsTypes() {
    $this->loginAsAdmin([
      'administer paragraphs types',
    ]);

    // Check paragraph types installed.
    $this->drupalGet('/admin/structure/paragraphs_type');
    $this->assertSession()->pageTextContains('box_link');
    $this->assertSession()->pageTextContains('call_out_box');
    $this->assertSession()->pageTextContains('fact_box');
    $this->assertSession()->pageTextContains('link_and_summary');
    $this->assertSession()->pageTextContains('quote');
    $this->assertSession()->pageTextContains('video_page_builder');

    // Check 'Box link' fields.
    $this->drupalGet('/admin/structure/paragraphs_type/box_link/fields');
    $this->assertSession()->pageTextContains('localgov_image');
    $this->assertSession()->pageTextContains('field_link');

    // Check 'Call out box' fields.
    $this->drupalGet('/admin/structure/paragraphs_type/call_out_box/fields');
    $this->assertSession()->pageTextContains('field_background_image');
    $this->assertSession()->pageTextContains('field_body_text');
    $this->assertSession()->pageTextContains('field_button');
    $this->assertSession()->pageTextContains('field_header_text');

    // Check 'Fact box' fields.
    $this->drupalGet('/admin/structure/paragraphs_type/fact_box/fields');
    $this->assertSession()->pageTextContains('field_above_text');
    $this->assertSession()->pageTextContains('field_background');
    $this->assertSession()->pageTextContains('field_below_text');
    $this->assertSession()->pageTextContains('field_fact');

    // Check 'Link and summary' fields.
    $this->drupalGet('/admin/structure/paragraphs_type/link_and_summary/fields');
    $this->assertSession()->pageTextContains('field_summary');
    $this->assertSession()->pageTextContains('field_link');

    // Check 'Quote' fields.
    $this->drupalGet('/admin/structure/paragraphs_type/quote/fields');
    $this->assertSession()->pageTextContains('field_author');
    $this->assertSession()->pageTextContains('localgov_text_plain');

    // Check 'Video' fields.
    $this->drupalGet('/admin/structure/paragraphs_type/video_page_builder/fields');
    $this->assertSession()->pageTextContains('field_video_url');
  }

}
