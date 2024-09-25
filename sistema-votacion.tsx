import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// ... (otros componentes permanecen iguales)

const Filtro = ({ setMostrarPorcentaje, candidatosVisibles, setCandidatosVisibles }) => {
  const [todosSeleccionados, setTodosSeleccionados] = useState(true);

  useEffect(() => {
    setTodosSeleccionados(Object.values(candidatosVisibles).every(Boolean));
  }, [candidatosVisibles]);

  const handleTodosChange = (checked) => {
    setTodosSeleccionados(checked);
    const nuevoEstado = Object.fromEntries(
      Object.keys(candidatosVisibles).map(candidato => [candidato, checked])
    );
    setCandidatosVisibles(nuevoEstado);
  };

  const handleCandidatoChange = (candidato, checked) => {
    setCandidatosVisibles(prev => {
      const nuevo = { ...prev, [candidato]: checked };
      setTodosSeleccionados(Object.values(nuevo).every(Boolean));
      return nuevo;
    });
  };

  return (
    <Card>
      <CardHeader className="font-bold text-xl">Ver</CardHeader>
      <CardContent>
        <RadioGroup defaultValue="total" onValueChange={(value) => setMostrarPorcentaje(value === 'porcentaje')}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="porcentaje" id="porcentaje" />
            <Label htmlFor="porcentaje">%</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="total" id="total" />
            <Label htmlFor="total">Total</Label>
          </div>
        </RadioGroup>
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox
              id="todos"
              checked={todosSeleccionados}
              onCheckedChange={handleTodosChange}
            />
            <label htmlFor="todos" className="font-bold">TODOS</label>
          </div>
          {Object.keys(candidatosVisibles).map((candidato) => (
            <div key={candidato} className="flex items-center space-x-2">
              <Checkbox
                id={candidato}
                checked={candidatosVisibles[candidato]}
                onCheckedChange={(checked) => handleCandidatoChange(candidato, checked)}
              />
              <label htmlFor={candidato}>{candidato}</label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const SistemaVotacion = () => {
  // ... (el resto del componente permanece igual)
};

export default SistemaVotacion;
