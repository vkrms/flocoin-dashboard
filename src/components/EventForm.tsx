import React, { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Button } from './ui/Button';
import { Checkbox } from './ui/Checkbox';
import { DatePicker } from './ui/DatePicker';
import { TimePicker } from './ui/TimePicker';
import { RadioGroup, RadioGroupItem } from './ui/RadioGroup';
import { ImageUpload } from './ui/ImageUpload';
import { Tag } from './ui/Tag';
import { Card } from './ui/Card';
import { Upload, Search, ChevronLeft, ChevronRight } from 'lucide-react';
export function EventForm() {
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [tags, setTags] = useState<string[]>(['music', 'festival', 'summer', 'outdoor']);
  const [tagInput, setTagInput] = useState('');
  const [capacity, setCapacity] = useState('25');
  // Checkbox states for marketplace settings - all set to false by default
  const [enableMarketplace, setEnableMarketplace] = useState(false);
  const [enableWaitlist, setEnableWaitlist] = useState(false);
  const [enableOrgFee, setEnableOrgFee] = useState(false);
  const [marketplaceCapacity, setMarketplaceCapacity] = useState('unlimited');
  const [limitPercentage, setLimitPercentage] = useState('4');
  const [organizerFee, setOrganizerFee] = useState('1.50');
  const addTag = () => {
    const trimmedInput = tagInput.trim().toLowerCase();
    if (trimmedInput && !tags.includes(trimmedInput) && tags.length < 10) {
      setTags([...tags, trimmedInput]);
      setTagInput('');
    }
  };
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsListRef.current) {
      const scrollAmount = 150; // Adjust scroll amount as needed
      const currentScroll = tabsListRef.current.scrollLeft;
      tabsListRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  return <div className="h-full flex flex-col w-fit">
      {/* Header */}
      <div className="flex justify-between items-center py-4 pr-6">
        <h1 className="text-2xl md:text-3xl font-bold">Event Creation</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Save</Button>
        </div>
      </div>
      <Tabs defaultValue="basic" className="w-full flex-1 flex flex-col">
        {/* Tabs navigation with arrows */}
        <div className="border-b dark:border-[#3333] light:border-gray-200 pb-2 relative">
          <div className="flex items-center md:block">
            {/* Left scroll arrow - only visible on mobile and positioned outside the scroll area */}
            <button onClick={() => scrollTabs('left')} className="md:hidden flex-shrink-0 h-9 w-9 flex items-center justify-center" aria-label="Scroll tabs left">
              <ChevronLeft className="h-5 w-5" />
            </button>
            {/* Tabs container with hidden scrollbar on mobile */}
            <div ref={tabsListRef} className="overflow-x-auto md:overflow-visible scrollbar-hide flex-grow" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
              <TabsList className="inline-flex min-w-max">
                <TabsTrigger value="basic" className="bg-[#8B5CF6]/10">
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
                <TabsTrigger value="presales">Presales</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="fees">Fees</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="tracking">Tracking</TabsTrigger>
                <TabsTrigger value="publish">Publish</TabsTrigger>
              </TabsList>
            </div>
            {/* Right scroll arrow - only visible on mobile and positioned outside the scroll area */}
            <button onClick={() => scrollTabs('right')} className="md:hidden flex-shrink-0 h-9 w-9 flex items-center justify-center" aria-label="Scroll tabs right">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        {/* Content area - unchanged */}
        <TabsContent value="basic" className="flex-1 overflow-auto pr-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1224px]">
            {/* Left Column */}
            <div className="space-y-6">
              <Card title="Event Image">
                <ImageUpload />
              </Card>
              <Card title="Event Info" className="space-y-5">
                <div className="space-y-4">
                  <div>
                    <Input id="title" placeholder="Title" value="PA Color Festival" />
                    <div className="text-xs dark:text-gray-400 light:text-gray-500 mt-1 text-right">
                      5/50
                    </div>
                  </div>
                  <div>
                    <Select defaultValue="festival">
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="festival">Festival</SelectItem>
                        <SelectItem value="concert">Concert</SelectItem>
                        <SelectItem value="conference">Conference</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input id="capacity" type="number" placeholder="Attendance" value={capacity} onChange={e => setCapacity(e.target.value)} />
                  </div>
                  <div>
                    <Textarea id="description" placeholder="Description" className="min-h-[120px] md:min-h-[150px]" />
                    <div className="text-xs dark:text-gray-400 light:text-gray-500 mt-1 text-right">
                      0/1500
                    </div>
                  </div>
                </div>
              </Card>
              <Card title="Event Dates">
                <div className="space-y-4">
                  <div>
                    <Select defaultValue="utc+2" data-position="auto">
                      <SelectTrigger>
                        <SelectValue placeholder="Timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc+2">UTC +2</SelectItem>
                        <SelectItem value="utc+1">UTC +1</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="utc-5">UTC -5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DatePicker date="15 June, 2025" position="auto" />
                    <DatePicker date="25 June, 2025" position="auto" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TimePicker time="14:00" position="auto" />
                    <TimePicker time="21:00" position="auto" />
                  </div>
                </div>
              </Card>
            </div>
            {/* Right Column */}
            <div className="space-y-6">
              <Card title="Tags">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, index) => <Tag key={index} label={tag} onRemove={() => removeTag(tag)} />)}
                  </div>
                  <div className="flex">
                    <Input placeholder="Add tag..." value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagInputKeyDown} />
                    <Button variant="secondary" size="sm" className="ml-2" onClick={addTag} disabled={!tagInput.trim() || tags.length >= 10}>
                      Add
                    </Button>
                  </div>
                  <div className="text-xs dark:text-gray-400 light:text-gray-500 mt-1 text-right">
                    {tags.length}/10
                  </div>
                </div>
              </Card>
              <Card title="Event Location">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search by location" className="pl-9" />
                  </div>
                  <div className="p-4 border border-dashed border-[#3f3f46] dark:border-[#3f3f46] light:border-gray-300 rounded-md">
                    <p className="text-sm text-gray-400 text-center">
                      No location found. Enter location manually.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input id="venue" placeholder="Venue Name" />
                    <Input id="address" placeholder="Address" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input id="city" placeholder="City" />
                    <Input id="state" placeholder="State" />
                    <Input id="zip" placeholder="Postal Code" />
                  </div>
                </div>
              </Card>
              <Card title="Ticket Marketplace Settings">
                <div className="space-y-5">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="enableMarketplace" checked={enableMarketplace} onChange={() => setEnableMarketplace(!enableMarketplace)} />
                    <div>
                      <p className="font-medium">
                        Enable ticket resale marketplace
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Allow attendees to resell their tickets on your event
                        page
                      </p>
                    </div>
                  </div>
                  {enableMarketplace && <>
                      <div className="pl-7">
                        <DatePicker date="2 June, 2025" />
                      </div>
                      <div className="pl-7">
                        <p className="mb-3 text-sm font-medium">
                          Marketplace Capacity
                        </p>
                        <RadioGroup defaultValue="unlimited" className="space-y-3" onChange={value => setMarketplaceCapacity(value)}>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="unlimited" id="unlimited" />
                            <label htmlFor="unlimited" className="text-sm">
                              Unlimited resales
                            </label>
                          </div>
                          <div className="flex items-start space-x-3">
                            <RadioGroupItem value="limited" id="limited" />
                            <div className="flex-1">
                              <label htmlFor="limited" className="text-sm">
                                Limit to
                              </label>
                              {marketplaceCapacity === 'limited' && <div className="flex items-center gap-2 mt-2">
                                  <Input className="w-10 h-8" value={limitPercentage} onChange={e => setLimitPercentage(e.target.value)} type="number" min="1" max="100" />
                                  <span className="text-sm">
                                    % of total tickets
                                  </span>
                                </div>}
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    </>}
                  <div className="flex items-start space-x-3 pt-1">
                    <Checkbox id="enableWaitlist" checked={enableWaitlist} onChange={() => setEnableWaitlist(!enableWaitlist)} />
                    <div>
                      <p className="font-medium">Enable Waitlist</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Allow attendees to join a waitlist if tickets are sold
                        out
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 pt-1">
                    <Checkbox id="orgFee" checked={enableOrgFee} onChange={() => setEnableOrgFee(!enableOrgFee)} />
                    <div>
                      <p className="font-medium">
                        Add organizer fee on resales
                      </p>
                      {enableOrgFee && <>
                          <div className="mt-3 flex items-center">
                            <span className="mr-2 text-sm">$</span>
                            <Input className="w-28" value={organizerFee} onChange={e => {
                          // Only allow numbers and decimals
                          const value = e.target.value.replace(/[^0-9.]/g, '');
                          setOrganizerFee(value);
                        }} placeholder="Fee amount" type="text" inputMode="decimal" />
                          </div>
                          <div className="mt-3 space-y-1">
                            <p className="text-sm text-gray-400">
                              eventflo platform fee: $5 per ticket
                            </p>
                            <p className="text-sm text-gray-400">
                              Total seller fee: $
                              {(parseFloat(organizerFee || '0') + 5).toFixed(2)}{' '}
                              per ticket
                            </p>
                            {/* Only show warning when total fees exceed $10 */}
                            {parseFloat(organizerFee || '0') + 5 > 10 && <div className="mt-2 p-2 bg-red-900/20 border border-red-500/30 rounded-md flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                  <line x1="12" y1="9" x2="12" y2="13"></line>
                                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                                <p className="text-sm text-red-400">
                                  Warning: High fees may discourage resales
                                </p>
                              </div>}
                          </div>
                        </>}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          {/* Add bottom padding for better scrolling experience */}
          <div className="h-8"></div>
        </TabsContent>
        <TabsContent value="tickets" className="flex-1 overflow-auto pr-6 mt-6">
          <Card title="Ticket Information">
            <p>Ticket configuration will be available here.</p>
          </Card>
        </TabsContent>
        <TabsContent value="presales" className="flex-1 overflow-auto pr-6 mt-6">
          <Card title="Presale Configuration">
            <p>Presale settings will be available here.</p>
          </Card>
        </TabsContent>
        <TabsContent value="team" className="flex-1 overflow-auto pr-6 mt-6">
          <Card title="Team Management">
            <p>Team settings will be available here.</p>
          </Card>
        </TabsContent>
        <TabsContent value="fees" className="flex-1 overflow-auto pr-6 mt-6">
          <Card title="Fee Structure">
            <p>Fee configuration will be available here.</p>
          </Card>
        </TabsContent>
        <TabsContent value="privacy" className="flex-1 overflow-auto pr-6 mt-6">
          <Card title="Privacy Settings">
            <p>Privacy configuration will be available here.</p>
          </Card>
        </TabsContent>
        <TabsContent value="tracking" className="flex-1 overflow-auto pr-6 mt-6">
          <Card title="Tracking Options">
            <p>Tracking configuration will be available here.</p>
          </Card>
        </TabsContent>
        <TabsContent value="publish" className="flex-1 overflow-auto pr-6 mt-6">
          <Card title="Publish Event">
            <p>Publishing options will be available here.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}