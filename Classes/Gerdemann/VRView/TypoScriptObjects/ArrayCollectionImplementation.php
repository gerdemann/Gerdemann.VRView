<?php
namespace Gerdemann\VRView\TypoScriptObjects;

use TYPO3\Flow\Annotations as Flow;
use TYPO3\TypoScript\TypoScriptObjects\AbstractCollectionImplementation;

/**
 * Render a TypoScript collection of nodes
 *
 * //tsPath collection *Collection
 * //tsPath itemRenderer the TS object which is triggered for each element in the node collection
 */
class ArrayCollectionImplementation extends AbstractCollectionImplementation
{
    /**
     * Evaluate the collection nodes
     *
     * @return string
     * @throws \Exception
     */
    public function evaluate()
    {
        $collection = $this->getCollection();

        $output = array();
        if ($collection === null) {
            return array();
        }
        $this->numberOfRenderedNodes = 0;
        $itemName = $this->getItemName();
        if ($itemName === null) {
            throw new \Exception('The Collection needs an itemName to be set.', 1344325771);
        }
        $itemKey = $this->getItemKey();
        $iterationName = $this->getIterationName();
        $collectionTotalCount = count($collection);
        foreach ($collection as $collectionKey => $collectionElement) {
            $context = $this->tsRuntime->getCurrentContext();
            $context[$itemName] = $collectionElement;
            if ($itemKey !== null) {
                $context[$itemKey] = $collectionKey;
            }
            if ($iterationName !== null) {
                $context[$iterationName] = $this->prepareIterationInformation($collectionTotalCount);
            }

            $this->tsRuntime->pushContextArray($context);
            $output[] = $this->tsRuntime->render($this->path . '/itemRenderer');
            $this->tsRuntime->popContext();
            $this->numberOfRenderedNodes++;
        }

        return $output;
    }
}
