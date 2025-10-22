import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { calculationsService } from '@/services/calculations.service';
import { Calculation, CalculationType } from '@/types/calculation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search, Calculator, CheckCircle, XCircle } from 'lucide-react';

const Calculations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<CalculationType | 'all'>('all');

  const { toast } = useToast();

  const { data: calculationsData, isLoading } = useQuery({
    queryKey: ['calculations'],
    queryFn: () => calculationsService.getAllCalculations(),
  });

  const filteredCalculations = calculationsData?.data.filter((calc) => {
    const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || calc.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Calculation Engine</h1>
          <p className="text-muted-foreground">Green building performance calculations</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search calculations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-32 bg-muted"></CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCalculations?.map((calc) => (
            <Card key={calc.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      {calc.name}
                    </CardTitle>
                    <CardDescription className="mt-2">{calc.type.replace('_', ' ')}</CardDescription>
                  </div>
                  {calc.compliance ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unit:</span>
                    <span className="font-medium">{calc.unit}</span>
                  </div>
                  {calc.benchmark && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Benchmark:</span>
                      <span className="font-medium">{calc.benchmark}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Compliance:</span>
                    <Badge variant={calc.compliance ? 'default' : 'destructive'}>
                      {calc.compliance ? 'Compliant' : 'Non-compliant'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calculations;
