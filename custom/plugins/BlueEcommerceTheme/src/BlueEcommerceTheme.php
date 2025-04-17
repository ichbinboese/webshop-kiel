<?php declare(strict_types=1);

namespace BlueEcommerceTheme;

use Shopware\Core\Framework\Plugin;
use Shopware\Storefront\Framework\ThemeInterface;

class BlueEcommerceTheme extends Plugin implements ThemeInterface
{
    /**
     * Get the absolute path of the theme directory
     */
    public function getThemeConfigPath(): string
    {
        return __DIR__ . '/Resources/theme.json';
    }
    
    /**
     * Returns the theme name to be displayed
     */
    public function getThemeName(): string
    {
        return 'BlueEcommerceTheme';
    }
}
